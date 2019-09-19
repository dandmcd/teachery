import React from "react";
import { ApolloConsumer } from "react-apollo";
import styled from "styled-components";

import * as routes from "../../constants/routes";
import history from "../../constants/history";

import Button from "../../theme/Button";

const SOButton = styled(Button)`
  height: auto;
  width: 80px;
  border: 2px solid ${props => props.theme.secondaryDark};
  display: table-cell;
  vertical-align: middle;
  :hover {
    color: ${props => props.theme.text};
    background: #fff;
  }
`;

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <SOButton type="button" onClick={() => signOut(client)}>
        Sign Out
      </SOButton>
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
