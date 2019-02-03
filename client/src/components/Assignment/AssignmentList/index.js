import React from "react";

import AssignmentItem from "../AssignmentItem";

const AssignmentList = ({ assignments }) =>
  assignments.edges.map(({ assignment }) => (
    <div key={assignment.id}>
      <AssignmentItem {...assignment} />
    </div>
  ));

export default AssignmentList;
