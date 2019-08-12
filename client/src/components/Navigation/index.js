import React from "react";
import { Link } from "react-router-dom";

import * as routes from "../../constants/routes";
import SignOutButton from "../SignOut";

import "./style.css";

const Navigation = ({ session }) => (
  <div className="header">
    <span className="logo">
      <Link to={routes.LANDING}>
        Teachery <small>v0.60a</small>
      </Link>
    </span>
    <input className="menu-btn" type="checkbox" id="menu-btn" />
    <label className="menu-icon" htmlFor="menu-btn">
      <span className="navicon" />
    </label>
    {session && session.me ? (
      <NavigationAuth session={session} />
    ) : (
      <NavigationNonAuth />
    )}
  </div>
);

const NavigationAuth = ({ session }) => (
  <ul className="menu">
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
);

const NavigationNonAuth = () => (
  <ul className="menu">
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
