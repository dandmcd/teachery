import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import withSession from "../../Session/withSession";
import * as routes from "../../../routing/routes";
import SignOutButton from "../../SignOut";

const Navbar = styled.nav`
  overflow-x: hidden;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 20;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
`;

const NavLeft = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  text-align: left;
  font-size: 36px;
  font-weight: lighter;
`;

const NavRight = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: baseline;
  text-align: right;
  font-size: 0.8rem;
  margin-right: 10px;
  list-style: none;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuToggle = styled.div`
  @media all and (max-width: 48em) {
    display: block;
    position: relative;
    z-index: 30;
    -webkit-user-select: none;
    user-select: none;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.input`
  position: relative;
  z-index: 30;
  display: block;
  background-color: blue;
  margin-right: 10px;
  width: 42px;
  height: 34px;
  top: -7px;
  left: -8px;
  position: absolute;
  cursor: pointer;
  opacity: 0;
  -webkit-touch-callout: none;
  :checked ~ span:nth-last-child(2) {
    opacity: 1;
    transform: rotate(0deg) scale(1.2, 1.2) translate(0px, 0px);
    background: #232323;
  }
  :checked ~ span:nth-last-child(1) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }
  :checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }
`;

const MenuSpan = styled.span`
  @media (max-width: 768px) {
    display: block;
    width: 33px;
    height: 4px;
    margin-right: 10px;
    margin-bottom: 5px;
    position: relative;
    z-index: 20;
    background: red;
    border-radius: 3px;

    transform-origin: 4px 0px;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;

    :first-child {
      transform-origin: 0% 0%;
    }

    :nth-last-child(2) {
      transform-origin: 0% 100%;
    }
  }
`;

const NavLinks = styled.ul`
  position: relative;
  z-index: 20;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  list-style: none;
`;

const NavLink = styled.li`
  font-size: 16px;
  position: relative;
  z-index: 20;
  text-decoration: none;
  margin: 0 7px;
  a {
    color: ${props => props.theme.primary};
    :hover {
      bottom: -5px;
      border-radius: 6px;
      background: #f9f9f9;
      height: 4px;
      transition-property: width;
      transition-duration: 0.3s;
      transition-timing-function: ease-out;
    }
  }
`;

const DesktopNavbar = ({ isChecked, toggleMobileNavbar, session }) => {
  return (
    <Navbar>
      <NavLeft>
        <Link to={routes.LANDING}>Teachery</Link>
      </NavLeft>
      <NavRight>
        {session && session.me ? (
          <NavigationAuth session={session} />
        ) : (
          <NavigationNonAuth />
        )}
      </NavRight>
      <MenuToggle>
        <MenuButton
          type="checkbox"
          checked={isChecked}
          onClick={toggleMobileNavbar}
          onChange={toggleMobileNavbar}
        />
        <MenuSpan />
        <MenuSpan />
        <MenuSpan />
      </MenuToggle>
    </Navbar>
  );
};

const NavigationAuth = ({ session }) => (
  <NavLinks>
    <NavLink>
      <Link to={routes.FLASHCARDS}>FlashCards</Link>
    </NavLink>
    <NavLink>
      <Link to={routes.ASSIGNMENTS}>Assignments</Link>
    </NavLink>
    <NavLink>
      <Link to={routes.ACCOUNT}>Account ({session.me.username})</Link>
    </NavLink>
    {session && session.me && session.me.role === ("TEACHER" || "ADMIN") && (
      <NavLink>
        <Link to={routes.TEACHER}>Teachers</Link>
      </NavLink>
    )}
    {session && session.me && session.me.role === "ADMIN" && (
      <NavLink>
        <Link to={routes.ADMIN}>Admin</Link>
      </NavLink>
    )}
    <NavLink>
      <SignOutButton />
    </NavLink>
  </NavLinks>
);

const NavigationNonAuth = () => (
  <NavLinks>
    <NavLink>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </NavLink>
  </NavLinks>
);

export default withSession(DesktopNavbar);
