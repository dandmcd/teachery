import React from "react";
import styled from "styled-components";

import withSession from "../Session/withSession";
import AssignedTasks from "./Assignments";

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

const AssignmentsHeader = styled.h3`
  width: 100%;
  margin-bottom: 10px;
`;

const AssignmentPage = () => (
  <Container>
    <AssignmentsHeader>Assignments</AssignmentsHeader>
    <AssignedTasks limit={3} />
  </Container>
);

export default withSession(AssignmentPage);
