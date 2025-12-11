import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }
  
  h1, h2, h3, h4 {
    font-family: 'Playfair Display', serif;
  }
  

  p {
    line-height: 1.6;
  }
`;

export default GlobalStyles;
