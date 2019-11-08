import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as Styled from "./style";
import withSession from "../../Session/withSession";
import * as routes from "../../../routing/routes";
import SignOutButton from "../../SignOut";

const MobileNavbar = ({ displayMobileNavbar, toggleMobileNavbar, session }) => {
  return (
    <Styled.Navbar displayMobileNavbar={displayMobileNavbar}>
      <Styled.NavRight>
        {session && session.me ? (
          <NavigationAuth
            toggleMobileNavbar={toggleMobileNavbar}
            session={session}
          />
        ) : (
          <NavigationNonAuth />
        )}
      </Styled.NavRight>
    </Styled.Navbar>
  );
};

MobileNavbar.propTypes = {
  displayMobileNavbar: PropTypes.bool.isRequired,
  toggleMobileNavbar: PropTypes.func.isRequired,
  session: PropTypes.object
};

const NavigationAuth = ({ toggleMobileNavbar, session }) => (
  <Styled.NavLinks onClick={toggleMobileNavbar}>
    <Styled.NavLink>
      <Link to={routes.FLASHCARDS}>Flashcards</Link>
    </Styled.NavLink>
    <Styled.NavLink>
      <Link to={routes.ASSIGNMENTS}>Assignments</Link>
    </Styled.NavLink>
    <Styled.NavLink>
      <Link to={routes.ACCOUNT}>Account ({session.me.username})</Link>
    </Styled.NavLink>
    {(session && session.me && session.me.role === "TEACHER") ||
      ("ADMIN" && (
        <Styled.NavLink>
          <Link to={routes.TEACHER}>Teachers</Link>
        </Styled.NavLink>
      ))}
    {session && session.me && session.me.role === "ADMIN" && (
      <Styled.NavLink>
        <Link to={routes.ADMIN}>Admin</Link>
      </Styled.NavLink>
    )}
    <Styled.NavLink>
      <SignOutButton />
    </Styled.NavLink>
  </Styled.NavLinks>
);

NavigationAuth.propTypes = {
  toggleMobileNavbar: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

const NavigationNonAuth = () => (
  <Styled.NavLinks>
    <Styled.NavLink>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </Styled.NavLink>
  </Styled.NavLinks>
);

export default withSession(MobileNavbar);
