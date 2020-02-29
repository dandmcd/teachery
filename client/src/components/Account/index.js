import React, { Fragment } from "react";
import styled from "styled-components";

import withAuthorization from "../Session/withAuthorization";
import GoBack from "../Navigation/GoBack";
import ChangePassword from "./AccountSettings/ChangePassword";
import Button from "../../theme/Button";
import { Link } from "react-router-dom";
import * as routes from "../../routing/routes";
import Account from "./Accounts";

const AccountPage = () => (
  <Fragment>
    <Header>
      <Menu>
        <Title>Account Settings</Title>
      </Menu>
    </Header>
    <Account />
  </Fragment>
);

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

const Header = styled.div`
  background-color: ${props => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0.5em;
  @media only screen and (max-width: 675px) {
    text-align: center;
    align-self: flex-end;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

const DevMessage = styled.h4`
  margin: 0;
  padding: 0.2em 0px 0.2em 12px;
  @media only screen and (max-width: 675px) {
    text-align: center;
    align-self: flex-end;
  }
`;

const Hr = styled.hr`
  padding: 0;
  margin: 0;
  border: none;
  height: 2px;
  width: 100%;
  // Continue below changing all non-themed colors
  background-image: -webkit-linear-gradient(
    left,
    ${props => props.theme.primary},
    ${props => props.theme.neutralLight}
  );
`;

export default withAuthorization(session => session && session.me)(AccountPage);
