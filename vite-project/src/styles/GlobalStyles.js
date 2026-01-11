import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap');

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
