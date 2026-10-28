import { createReadableStreamFromReadable } from "@react-router/node";
import { PassThrough, Transform } from "node:stream";
import { ServerRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { FRAMEWORK_STYLES_ELEMENT_ID } from "./config/frameworkStyles.js";

export const streamTimeout = 10_000;

function getStyleContents(styles) {
  const start = styles.indexOf(">");
  const end = styles.lastIndexOf("</style>");

  return start === -1 || end === -1 ? "" : styles.slice(start + 1, end);
}

function injectStylesIntoFrameworkPlaceholder(styles) {
  let buffered = "";
  let didInject = false;

  return new Transform({
    transform(chunk, _encoding, callback) {
      if (didInject) {
        callback(null, chunk);
        return;
      }

      buffered += chunk.toString();
      const markerIndex = buffered.indexOf(
        `id="${FRAMEWORK_STYLES_ELEMENT_ID}"`
      );

      if (markerIndex === -1) {
        callback();
        return;
      }

      const styleStart = buffered.lastIndexOf("<style", markerIndex);
      const contentStart = buffered.indexOf(">", markerIndex) + 1;
      const styleEnd = buffered.indexOf("</style>", contentStart);

      if (styleStart === -1 || contentStart === 0 || styleEnd === -1) {
        callback();
        return;
      }

      didInject = true;
      callback(
        null,
        `${buffered.slice(0, contentStart)}${getStyleContents(styles)}${buffered.slice(styleEnd)}`
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
          // The Framework document includes a matching empty style element.
          // Filling that element after all lazy routes resolve keeps the
          // server CSS in React's tree, so the client can hydrate it intact.
          const styledBody = injectStylesIntoFrameworkPlaceholder(
            sheet.getStyleTags()
          );
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
