import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import withAuthorization from "../Session/withAuthorization";
import Account from "./Accounts";

const AccountPage = (props) => (
  <Fragment>
    <Header>
      <Menu>
        <Title>Account Settings</Title>
      </Menu>
    </Header>
    <Account props={props} />
  </Fragment>
);

AccountPage.propTypes = {
  props: PropTypes.object,
};

const Header = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto auto 5px auto;
  display: inline-block;
`;

const Menu = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0;
  padding: 0.5em;
  @media only screen and (max-width: 675px) {
    text-align: center;
    -ms-flex-item-align: end;
    align-self: flex-end;
  }
`;

export default withAuthorization((session) => session && session.me)(
  AccountPage
);
