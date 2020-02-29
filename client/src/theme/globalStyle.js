import { createGlobalStyle } from "styled-components";

import OpenSans300Woff2 from "../assets/fonts/open-sans-v17-latin-300.woff2";
import OpenSans300Woff from "../assets/fonts/open-sans-v17-latin-300.woff";
import OpenSansRWoff2 from "../assets/fonts/open-sans-v17-latin-regular.woff2";
import OpenSansRWoff from "../assets/fonts/open-sans-v17-latin-regular.woff";
import OpenSansIWoff2 from "../assets/fonts/open-sans-v17-latin-italic.woff2";
import OpenSansIWoff from "../assets/fonts/open-sans-v17-latin-italic.woff";
import OpenSans600Woff2 from "../assets/fonts/open-sans-v17-latin-600.woff2";
import OpenSans600Woff from "../assets/fonts/open-sans-v17-latin-600.woff";
import OpenSans800Woff2 from "../assets/fonts/open-sans-v17-latin-800.woff2";
import OpenSans800Woff from "../assets/fonts/open-sans-v17-latin-800.woff";

const GlobalStyle = createGlobalStyle`
* {
/* open-sans-300 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: local('Open Sans Light'), local('OpenSans-Light'),
       url(${OpenSans300Woff2}) format('woff2'), /* Super Modern Browsers */
       url(${OpenSans300Woff}) format('woff'), /* Modern Browsers */
}
/* open-sans-regular - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans Regular'), local('OpenSans-Regular'),
       url(${OpenSansRWoff2}) format('woff2'), /* Super Modern Browsers */
       url(${OpenSansRWoff}) format('woff'), /* Modern Browsers */

}
/* open-sans-italic - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 400;
  src: local('Open Sans Italic'), local('OpenSans-Italic'),
       url(${OpenSansIWoff2}) format('woff2'), /* Super Modern Browsers */
       url(${OpenSansIWoff}) format('woff'), /* Modern Browsers */

}
/* open-sans-600 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'),
       url(${OpenSans600Woff2}) format('woff2'), /* Super Modern Browsers */
       url(${OpenSans600Woff}) format('woff'), /* Modern Browsers */
}
/* open-sans-800 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  src: local('Open Sans ExtraBold'), local('OpenSans-ExtraBold'),
       url(${OpenSans800Woff2}) format('woff2'), /* Super Modern Browsers */
       url(${OpenSans800Woff}) format('woff'), /* Modern Browsers */
}
}
body {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  background-color: ${props => props.theme.appBody};
  color: ${props => props.theme.text};
  outline: none;
  transition: all 1s linear;
}
#root {
  position: relative;
  z-index: 1;

}
a {
  color: ${props => props.theme.link};
  text-decoration: none;
}

a:hover {
  color: ${props => props.theme.hoverLink};
}

h1 {
      font-size: 36px;
  }
    h2 {
      font-size: 24px;
  }
    h3 {
      font-size: 18px;
      font-weight: 600;
  }
    h4 {
      font-size: 14px;
  }
    h5 {
      font-size: 12px;
  }
    h6 {
      font-size: 8px;
  }
`;

export default GlobalStyle;
