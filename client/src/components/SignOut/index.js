import React from "react";
import { ApolloConsumer } from "react-apollo";

import * as routes from "../../constants/routes";
import history from "../../constants/history";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #233841;
  color: #233841;
  padding: 0.25em 1em;
  &:disabled {
    color: rgba(35, 56, 65, 0.5);
    border: 2px solid rgba(35, 56, 65, 0.3);
  }
`;

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <Button type="button" onClick={() => signOut(client)}>
        Sign Out
      </Button>
    )}
  </ApolloConsumer>
);

const signOut = client => {
  localStorage.removeItem("token");
  client.resetStore();
  history.push(routes.SIGN_IN);
};

export { signOut };

export default SignOutButton;
