import React from "react";
import { ApolloConsumer } from "@apollo/react-hooks";
import styled from "styled-components";

import * as routes from "../../routing/routes";
import history from "../../routing/history";
import Button from "../../theme/Button";

const SOButton = styled(Button)`
  height: auto;
  width: 80px;
  text-align: center;
  vertical-align: middle;
  border: 2px solid ${props => props.theme.secondaryDark};
  display: table-cell;
  :hover {
    color: ${props => props.theme.text};
    background: #fff;
  }
`;

const SOText = styled.span`
  margin-left: auto;
  margin-right: auto;
`;

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

export { signOut };

export default SignOutButton;
