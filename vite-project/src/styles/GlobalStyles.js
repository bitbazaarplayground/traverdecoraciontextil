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
    src: url("/fonts/Playfair-VariableFont_opsz,wdth,wght.woff2") format("woff2");
    font-weight: 1 1000;
    font-style: normal;
    font-display: swap;
  
    /* reduce layout shift when swapping from fallback */
    ascent-override: 92%;
    descent-override: 22%;
    line-gap-override: 0%;
    size-adjust: 102%;
  }
  
  
  
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body { font-family: 'Helvetica Neue', Arial, sans-serif; }

  h1, h2, h3, h4 {
    font-family: "Playfair Display", Georgia, "Times New Roman", serif;
    line-height: 1.12;
  }
  
  

  p { line-height: 1.6; }

`;

export default GlobalStyles;
