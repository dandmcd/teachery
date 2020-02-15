import React from "react";
import styled from "styled-components";

import withAuthorization from "../Session/withAuthorization";
import GoBack from "../Navigation/GoBack";

const AccountPage = () => (
  <Container>
    <Header>
      <Menu>
        <Title>Account Settings</Title>
        <DevMessage>
          This page is currently under development, please go back{" "}
          <GoBack message="Return" />
        </DevMessage>
      </Menu>
    </Header>
    <Hr />
  </Container>
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

export const Hr = styled.hr`
  padding: 0;
  margin: 0;
  border: none;
  height: 2px;
  width: 100%;
  background-image: -webkit-linear-gradient(left, #c51d1d, #faf9f9);
`;

export default withAuthorization(session => session && session.me)(AccountPage);
