import React from "react";

import withAuthorization from "../Session/withAuthorization";
import Assignments from "./Assignments";
import AssignmentCreate from "./AssignmentCreate";

const AssignmentPage = () => (
  <div>
    <h1>Account Page</h1>
    <AssignmentCreate />
    <hr />
    <Assignments limit={3} />
  </div>
);

export default withAuthorization(session => session && session.me)(
  AssignmentPage
);
