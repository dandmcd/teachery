import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import withSession from "../../Session/withSession";
import * as routes from "../../../routing/routes";
import SignOutButton from "../../SignOut";
import * as Styled from "./style";

const DesktopNavbar = ({ isChecked, toggleMobileNavbar, session }) => {
  return (
    <Styled.Navbar>
      <Styled.NavLeft>
        <Link to={session ? routes.DASHBOARD : routes.LANDING}>Teachery</Link>
      </Styled.NavLeft>
      <Styled.NavRight>
        {session && session.me ? (
          <NavigationAuth session={session} />
        ) : (
          <NavigationNonAuth />
        )}
      </Styled.NavRight>
      <Styled.MenuToggle>
        <Styled.MenuButton
          type="checkbox"
          checked={isChecked}
          onClick={toggleMobileNavbar}
          onChange={toggleMobileNavbar}
        />
        <Styled.MenuSpan />
        <Styled.MenuSpan />
        <Styled.MenuSpan />
      </Styled.MenuToggle>
    </Styled.Navbar>
  );
};

DesktopNavbar.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  toggleMobileNavbar: PropTypes.func.isRequired,
  session: PropTypes.object
};

const NavigationAuth = ({ session }) => {
  let role;
  if (session && session.me && session.me.role === "TEACHER") {
    role = true;
  } else if (session && session.me && session.me.role === "ADMIN") {
    role = true;
  }

  return (
    <Styled.NavLinks>
      <Styled.NavLink>
        <Link to={routes.FLASHCARDS}>FlashCards</Link>
      </Styled.NavLink>
      <Styled.NavLink>
        <Link to={routes.ASSIGNMENTS}>Assignments</Link>
      </Styled.NavLink>
      <Styled.NavLink>
        <Link to={routes.ACCOUNT}>Account ({session.me.username})</Link>
      </Styled.NavLink>
      {role && (
        <Styled.NavLink>
          <Link to={routes.TEACHER}>Teachers</Link>
        </Styled.NavLink>
      )}
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
};

NavigationAuth.propTypes = {
  session: PropTypes.object.isRequired
};

const NavigationNonAuth = () => (
  <Styled.NavLinks>
    <Styled.NavLink>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </Styled.NavLink>
  </Styled.NavLinks>
);

export default withSession(DesktopNavbar);
