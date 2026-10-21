import { createReadableStreamFromReadable } from "@react-router/node";
import { PassThrough, Transform } from "node:stream";
import { ServerRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export const streamTimeout = 10_000;

function injectStylesIntoHead(styles) {
  let buffered = "";
  let didInject = false;

  return new Transform({
    transform(chunk, _encoding, callback) {
      if (didInject) {
        callback(null, chunk);
        return;
      }

      buffered += chunk.toString();
      const headEnd = buffered.indexOf("</head>");

      if (headEnd === -1) {
        callback();
        return;
      }

      didInject = true;
      callback(
        null,
        `${buffered.slice(0, headEnd)}${styles}${buffered.slice(headEnd)}`
      );
    },
    flush(callback) {
      callback(
        didInject
          ? undefined
          : new Error("Framework document did not render a <head> element")
      );
    },
  });
}

/**
 * Framework Mode uses this entry only while building and testing the isolated
 * static POC. Waiting for all React Suspense boundaries avoids writing a
 * fallback shell for legacy React.lazy routes into a prerendered document.
 */
export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext
) {
  if (request.method === "HEAD") {
    return new Response(null, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  }

  return new Promise((resolve, reject) => {
    const sheet = new ServerStyleSheet();
    let didError = false;
    let shellRendered = false;
    let didSeal = false;

    const sealSheet = () => {
      if (!didSeal) {
        didSeal = true;
        sheet.seal();
      }
    };

    const { abort, pipe } = renderToPipeableStream(
      <StyleSheetManager sheet={sheet.instance}>
        <ServerRouter context={routerContext} url={request.url} />
      </StyleSheetManager>,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          // onAllReady guarantees every legacy lazy route has rendered, so the
          // complete style collection can be placed in the document head
          // before the response stream starts flowing to the browser.
          const styledBody = injectStylesIntoHead(sheet.getStyleTags());
          sealSheet();
          body.pipe(styledBody);

          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(createReadableStreamFromReadable(styledBody), {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error) {
          sealSheet();
          reject(error);
        },
        onError(error) {
          didError = true;

          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, streamTimeout + 1_000);
  });
}
