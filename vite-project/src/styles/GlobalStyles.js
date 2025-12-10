import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #ffffff;
    color: #111;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  p {
    line-height: 1.6;
  }
`;

export default GlobalStyles;
