import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import withSession from "../../Session/withSession";
import * as routes from "../../../constants/routes";
import SignOutButton from "../../SignOut";

const Navbar = styled.nav`
  overflow-x: hidden;
  width: 100%;
  position: fixed;
  top: 60px;
  margin-top: 0px;
  width: 100%;
  background: white;
  align-self: flex-end;
  z-index: ${props => (props.displayMobileNavbar ? 20 : 1)};
  transition: transform 1s;
  transform: translateX(
    ${props => (props.displayMobileNavbar ? "0%" : "calc(100% + 15px)")}
  );
`;

const NavRight = styled.div`
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  list-style: none;
`;

const NavLinks = styled.ul`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  list-style: none;
  margin: 0 5px;
  padding: 0px;
`;

const NavLink = styled.li`
  font-size: 16px;
  position: relative;
  text-decoration: none;
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

const MobileNavbar = ({ displayMobileNavbar, toggleMobileNavbar, session }) => {
  return (
    <Navbar displayMobileNavbar={displayMobileNavbar}>
      <NavRight>
        {session && session.me ? (
          <NavigationAuth
            toggleMobileNavbar={toggleMobileNavbar}
            session={session}
          />
        ) : (
          <NavigationNonAuth />
        )}
      </NavRight>
    </Navbar>
  );
};

const NavigationAuth = ({ toggleMobileNavbar, session }) => (
  <NavLinks onClick={toggleMobileNavbar}>
    <NavLink>
      <Link to={routes.FLASHCARDS}>Flashcards</Link>
    </NavLink>
    <NavLink>
      <Link to={routes.ASSIGNMENTS}>Assignments</Link>
    </NavLink>
    <NavLink>
      <Link to={routes.ACCOUNT}>Account ({session.me.username})</Link>
    </NavLink>
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

export default withSession(MobileNavbar);
