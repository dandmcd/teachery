import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import withAuthorization from "../Session/withAuthorization";

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

const AccountPage = () => (
  <Container>
    <h3>Account Page</h3>
    <hr />
    <h4>
      This page is currently under development, please{" "}
      <Link to="/">go back to Home</Link>
    </h4>
  </Container>
);

export default withAuthorization(session => session && session.me)(AccountPage);
