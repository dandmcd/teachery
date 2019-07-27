import React from "react";

import withAuthorization from "../Session/withAuthorization";
import AssignmentCreate from "../Assignment/AssignmentCreate";
import Assignments from "../Assignment/AssignmentAdmin";

const AdminPage = () => (
  <div>
    <h1>Admin Page</h1>
    <hr />
    <AssignmentCreate />

    <Assignments limit={3} />
  </div>
);

export default withAuthorization(
  session => session && session.me && session.me.role === "ADMIN"
)(AdminPage);
