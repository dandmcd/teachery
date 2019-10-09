import React from "react";
import styled from "styled-components";

import withAuthorization from "../Session/withAuthorization";
import GoBack from "../Navigation/GoBack";

const AccountPage = () => (
  <Container>
    <h3>Account Page</h3>
    <hr />
    <h4>
      This page is currently under development, please go back{" "}
      <GoBack message="Return" />
    </h4>
  </Container>
);

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

export default withAuthorization(session => session && session.me)(AccountPage);
