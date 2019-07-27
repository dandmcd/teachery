import React from "react";
import { Link } from "react-router-dom";

import withAuthorization from "../Session/withAuthorization";

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <hr />
    <h5>
      This page is currently under development, please{" "}
      <Link to="/">go back to Home</Link>
    </h5>
  </div>
);

export default withAuthorization(session => session && session.me)(AccountPage);
