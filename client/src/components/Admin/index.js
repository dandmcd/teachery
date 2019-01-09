import React from "react";

import withAuthorization from "../Session/withAuthorization";

import { AssignmentCreate } from "../Assignment";

const AdminPage = () => (
  <div>
    <h1>Admin Page</h1>
    <hr />
    <AssignmentCreate />
  </div>
);

export default withAuthorization(
  session => session && session.me && session.me.role === "ADMIN"
)(AdminPage);
