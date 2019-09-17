import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  background-color: #fff;
  color: #333;

  @import url('https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet');
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
