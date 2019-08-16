import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  background-color: #fff;
  color: #333;

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i" rel="stylesheet');
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#root {

  position: relative;
  z-index: 1;

}
a {
  color: #c51f1d;
  text-decoration: none;
}

a:hover {
  color: #666;
}


img {
  width: 100%;
}
`;

export default GlobalStyle;
