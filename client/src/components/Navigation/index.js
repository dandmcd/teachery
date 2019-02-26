import React from "react";
import { Link } from "react-router-dom";

import * as routes from "../../constants/routes";
import SignOutButton from "../SignOut";
import styled from "styled-components";

const NavWrapper = styled.div`
  grid-area: header;
  background-color: #fff;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
  ul {
    margin: 0;
    float: right;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }
  li a {
    display: block;
    padding: 20px 20px;
    border-right: 1px solid #f4f4f4;
    text-decoration: none;
  }
  li a:hover {
    background-color: rgba(231, 235, 219, 1);
  }
  li {
    float: left;
  }
  background-color: white;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  font-size: 0.8em;
`;

const NavLogo = styled.div`
  display: block;
  float: left;
  font-size: 2em;
  padding: 10px 20px;
  text-decoration: none;
`;

const BetaTag = styled.small`
  position: relative;
  bottom: 0.8em;
  font-size: 0.4em;
`;

const MenuIcon = styled.label`
  cursor: pointer;
  display: inline-block;
  float: right;
  padding: 28px 20px;
  position: relative;
  user-select: none;
`;

const NavIcon = styled.span`
  background: #333;
  display: block;
  height: 2px;
  position: relative;
  transition: background 0.2s ease-out;
  width: 18px;
  :before :after {
    background: #333;
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    transition: all 0.2s ease-out;
    width: 100%;
  }
  :before {
    top: 5px;
  }
  :after {
    top: -5px;
  }
`;

const Navigation = ({ session }) => (
  <NavWrapper>
    {session && session.me ? (
      <NavigationAuth session={session} />
    ) : (
      <NavigationNonAuth />
    )}
  </NavWrapper>
);

const NavigationAuth = ({ session }) => (
  <div>
    <NavLogo>
      <Link to={routes.LANDING}>
        Teachery <BetaTag>BETA</BetaTag>
      </Link>
    </NavLogo>
    <MenuIcon>
      <NavIcon />
    </MenuIcon>
    <ul>
      <li>
        <Link to={routes.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={routes.FLASHCARDS}>Flashcards</Link>
      </li>
      <li>
        <Link to={routes.ASSIGNMENTS}>Assignments</Link>
      </li>
      <li>
        <Link to={routes.ACCOUNT}>Account ({session.me.username})</Link>
      </li>
      {session && session.me && session.me.role === "ADMIN" && (
        <li>
          <Link to={routes.ADMIN}>Admin</Link>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
  </ul>
);

export default Navigation;
