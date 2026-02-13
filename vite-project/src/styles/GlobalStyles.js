import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
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

  
  @font-face {
    font-family: "Playfair Display";
    src: url("/fonts/PlayfairDisplay.woff2") format("woff2");
    font-weight: 400 600; /* matches what you used from Google */
    font-style: normal;
    font-display: swap;
    font-optical-sizing: auto;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body { font-family: 'Helvetica Neue', Arial, sans-serif; }

  h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }

  p { line-height: 1.6; }

 
`;

export default GlobalStyles;
