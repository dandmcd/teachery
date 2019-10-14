import React, { Fragment } from "react";
import styled from "styled-components";

import bluespinner from "../../assets/bluespinner.gif";

const Loading = () => (
  <Fragment>
    <Spinner src={bluespinner} alt="Loading..." />
  </Fragment>
);

const Spinner = styled.img`
  width: 200px;
  margin: auto;
  display: block;
`;

export default Loading;
