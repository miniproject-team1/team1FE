import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Escoredream";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-1Thin.woff") format("woff");
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Escoredream";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-2ExtraLight.woff") format("woff");
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Escoredream";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff") format("woff");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Escoredream";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Escoredream";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff") format("woff");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Escoredream";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff") format("woff");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Escoredream";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Escoredream";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff") format("woff");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Escoredream";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-9Black.woff") format("woff");
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  :root {
    /* Font Weight */
    --font-weight-thin: 100;
    --font-weight-extralight: 200;
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-heavy: 800;
    --font-weight-black: 900;

    /* Color */
    --color-main-bg: #EEF1DA;
    --color-black: #222222;
    --color-white: #ffffff;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    width: 100%;
    min-height: 100%;
  }

  body {
    font-family: "Escoredream", sans-serif;
    background-color: var(--color-main-bg);
    color: var(--color-black);
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  input,
  textarea {
    outline: none;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;
