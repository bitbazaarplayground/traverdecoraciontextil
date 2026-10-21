import { HelmetProvider } from "react-helmet-async";
import { Links, Meta, Outlet, Scripts } from "react-router";
import { ThemeProvider } from "styled-components";
import NetlifyFormsRegistry from "./components/contact/NetlifyFormsRegistry.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import { theme } from "./styles/theme.js";
import ScrollRestoration from "./utils/ScrollRestoration.jsx";

export function Layout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Language" content="es" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#f5f4f2" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="/fonts.css" />
        <link
          rel="preload"
          href="/fonts/CormorantGaramond-300.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CormorantGaramond-300italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PlayfairDisplay-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PlayfairDisplay-SemiBoldItalic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <NetlifyFormsRegistry />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * In SPA mode, non-prerendered URLs initially receive only the root document.
 * Keep that first client render structurally identical while the legacy
 * wildcard route module is discovered and loaded.
 */
export function HydrateFallback() {
  return null;
}

/**
 * Preserve the legacy provider ordering while Framework Mode supplies router
 * context through Outlet rather than BrowserRouter.
 */
export default function Root() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ScrollRestoration />
        <Outlet />
      </ThemeProvider>
    </HelmetProvider>
  );
}
