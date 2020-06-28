import React from "react";
import { ApolloConsumer } from "@apollo/react-hooks";
import styled from "styled-components";

import * as routes from "../../routing/routes";
import history from "../../routing/history";
import Button from "../../theme/Button";

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <SOButton type="button" onClick={() => signOut(client)}>
        <SOText>Sign Out</SOText>
      </SOButton>
    )}
  </ApolloConsumer>
);

const signOut = client => {
  localStorage.removeItem("token");
  client.resetStore();
  history.push(routes.SIGN_IN);
};

const SOButton = styled(Button)`
  font-size: 9px;
  height: auto;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  border: 2px solid ${props => props.theme.textLight};
  display: table-cell;
  :hover {
    background-color: ${props => props.theme.primaryDark};
  }
`;

const SOText = styled.span`
  margin-left: auto;
  margin-right: auto;
`;

export { signOut };

export default SignOutButton;
