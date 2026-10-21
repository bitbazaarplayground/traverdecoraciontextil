import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

html {
  scrollbar-gutter: stable;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow-y: scroll;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

h1, h2, h3, h4 {
  font-family: "Playfair Display", serif;
  font-weight: 600;
}

em, i {
  font-style: italic;
}

p {
  line-height: 1.6;
}

`;

export default GlobalStyles;
