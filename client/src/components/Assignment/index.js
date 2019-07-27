import React from "react";

import withSession from "../Session/withSession";
import AssignedTasks from "./Assignments";

const AssignmentPage = session => (
  <div>
    <h1>Assignments</h1>
    <hr />
    <AssignedTasks limit={3} />
  </div>
);

export default withSession(AssignmentPage);
