import React from "react";

import withSession from "../Session/withSession";
import Assignments from "./Assignments";
import AssignmentCreate from "./AssignmentCreate";

const AssignmentPage = session => (
  <div>
    <h1>Assignments</h1>
    {session && session.me && session.me.role && <AssignmentCreate />}
    <hr />
    <Assignments limit={3} />
  </div>
);

export default withSession(AssignmentPage);
