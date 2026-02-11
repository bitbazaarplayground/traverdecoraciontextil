import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body { font-family: 'Helvetica Neue', Arial, sans-serif; }

  h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }

  p { line-height: 1.6; }

  @font-face {
    font-family: "Cormorant Garamond";
    src: url("/fonts/CormorantGaramond-300.woff2") format("woff2");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Cormorant Garamond";
    src: url("/fonts/CormorantGaramond-300italic.woff2") format("woff2");
    font-weight: 300;
    font-style: italic;
    font-display: swap;
  }
`;

export default GlobalStyles;
