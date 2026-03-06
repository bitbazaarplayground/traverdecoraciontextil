import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

html {
  scrollbar-gutter: stable;
}

@font-face {
  font-family: "Playfair Display";
  src: url("/fonts/PlayfairDisplay-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;

  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 102%;
}

@font-face {
  font-family: "Playfair Display";
  src: url("/fonts/PlayfairDisplay-SemiBoldItalic.woff2") format("woff2");
  font-weight: 600;
  font-style: italic;
  font-display: swap;

  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 102%;
}
@font-face {
  font-family: "Cormorant Garamond";
  src: url("/fonts/CormorantGaramond-300.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;

  ascent-override: 92%;
  descent-override: 24%;
  line-gap-override: 0%;
  size-adjust: 108%;
}

@font-face {
  font-family: "Cormorant Garamond";
  src: url("/fonts/CormorantGaramond-300italic.woff2") format("woff2");
  font-weight: 300;
  font-style: italic;
  font-display: swap;

  ascent-override: 92%;
  descent-override: 24%;
  line-gap-override: 0%;
  size-adjust: 108%;
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
