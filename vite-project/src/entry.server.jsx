import { PassThrough } from "node:stream";
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

function injectStylesIntoFrameworkPlaceholder(document, styles) {
  const markerIndex = document.indexOf(
    `id="${FRAMEWORK_STYLES_ELEMENT_ID}"`
  );
  const styleStart = document.lastIndexOf("<style", markerIndex);
  const contentStart = document.indexOf(">", markerIndex) + 1;
  const styleEnd = document.indexOf("</style>", contentStart);

  if (markerIndex === -1 || styleStart === -1 || contentStart === 0 || styleEnd === -1) {
    throw new Error("Framework document did not render a styled-components placeholder");
  }

  return `${document.slice(0, contentStart)}${getStyleContents(styles)}${document.slice(styleEnd)}`;
}

function readDocument(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.once("error", reject);
    stream.once("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
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
    let abortTimeout;

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
          clearTimeout(abortTimeout);
          const body = new PassThrough();
          const styles = sheet.getStyleTags();
          sealSheet();
          pipe(body);

          readDocument(body)
            .then((document) => {
              responseHeaders.set("Content-Type", "text/html");
              resolve(
                new Response(
                  injectStylesIntoFrameworkPlaceholder(
                    // React Router's static writer can preserve NUL bytes in
                    // text split across streamed chunks. Browsers discard
                    // them before the client render, so remove them from the
                    // emitted document to keep hydration text identical.
                    document.replace(/\0/g, ""),
                    styles
                  ),
                  {
                    headers: responseHeaders,
                    status: didError ? 500 : responseStatusCode,
                  }
                )
              );
            })
            .catch(reject);
        },
        onShellError(error) {
          clearTimeout(abortTimeout);
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

    abortTimeout = setTimeout(abort, streamTimeout + 1_000);
  });
}
