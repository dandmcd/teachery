import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
/* open-sans-300 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: url('../assets/fonts/open-sans-v17-latin-300.eot'); /* IE9 Compat Modes */
  src: local('Open Sans Light'), local('OpenSans-Light'),
       url('../assets/fonts/open-sans-v17-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/open-sans-v17-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-300.woff') format('woff'), /* Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../assets/fonts/open-sans-v17-latin-300.svg#OpenSans') format('svg'); /* Legacy iOS */
}
/* open-sans-regular - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: url('../assets/fonts/open-sans-v17-latin-regular.eot'); /* IE9 Compat Modes */
  src: local('Open Sans Regular'), local('OpenSans-Regular'),
       url('../assets/fonts/open-sans-v17-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/open-sans-v17-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../assets/fonts/open-sans-v17-latin-regular.svg#OpenSans') format('svg'); /* Legacy iOS */
}
/* open-sans-italic - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 400;
  src: url('../assets/fonts/open-sans-v17-latin-italic.eot'); /* IE9 Compat Modes */
  src: local('Open Sans Italic'), local('OpenSans-Italic'),
       url('../assets/fonts/open-sans-v17-latin-italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/open-sans-v17-latin-italic.woff2') format('woff2'), /* Super Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-italic.woff') format('woff'), /* Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-italic.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../assets/fonts/open-sans-v17-latin-italic.svg#OpenSans') format('svg'); /* Legacy iOS */
}
/* open-sans-600 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  src: url('../assets/fonts/open-sans-v17-latin-600.eot'); /* IE9 Compat Modes */
  src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'),
       url('../assets/fonts/open-sans-v17-latin-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/open-sans-v17-latin-600.woff2') format('woff2'), /* Super Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-600.woff') format('woff'), /* Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-600.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../assets/fonts/open-sans-v17-latin-600.svg#OpenSans') format('svg'); /* Legacy iOS */
}
/* open-sans-800 - latin */
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 800;
  src: url('../assets/fonts/open-sans-v17-latin-800.eot'); /* IE9 Compat Modes */
  src: local('Open Sans ExtraBold'), local('OpenSans-ExtraBold'),
       url('../assets/fonts/open-sans-v17-latin-800.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/open-sans-v17-latin-800.woff2') format('woff2'), /* Super Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-800.woff') format('woff'), /* Modern Browsers */
       url('../assets/fonts/open-sans-v17-latin-800.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../assets/fonts/open-sans-v17-latin-800.svg#OpenSans') format('svg'); /* Legacy iOS */
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
  background-color: #fff;
  color: #333;


}
#root {

  position: relative;
  z-index: 1;

}
a {
  color: ${props => props.theme.primary};
  text-decoration: none;
}

a:hover {
  color: ${props => props.theme.primaryMed};
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
