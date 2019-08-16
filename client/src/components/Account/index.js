import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import withAuthorization from "../Session/withAuthorization";

const Container = styled.div`
  vertical-align: top;
  position: absolute;
  top: 0px;
  z-index: 1;
`;

const AccountPage = () => (
  <Container>
    <h1>Account Page</h1>
    <hr />
    <h5>
      This page is currently under development, please{" "}
      <Link to="/">go back to Home</Link>
    </h5>
  </Container>
);

export default withAuthorization(session => session && session.me)(AccountPage);
