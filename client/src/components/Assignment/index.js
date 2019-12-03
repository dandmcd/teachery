import React from "react";
import styled from "styled-components";

import withSession from "../Session/withSession";
import AssignedTasks from "./Assignments";
import AssignTaskUpdate from "./AssignmentAdmin/AssignTaskUpdate";

const AssignmentPage = () => (
  <Container>
    <AssignmentsHeader>Assignments</AssignmentsHeader>
    <AssignTaskUpdate />
    <AssignedTasks limit={6} />
  </Container>
);

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

const AssignmentsHeader = styled.h3`
  width: 100%;
  margin-bottom: 10px;
`;

export default withSession(AssignmentPage);
