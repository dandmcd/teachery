import React from "react";
import styled from "styled-components";

import withSession from "../Session/withSession";
import AssignedTasks from "./AssignedTasks";
import AssignTaskUpdate from "./AssignedTasks/AssignedTaskEdit";

const AssignmentPage = () => (
  <Container>
    <AssignmentHeader>
      <AssignTaskUpdate />
      <Title>Assignments</Title>
    </AssignmentHeader>
    <AssignmentsWrapper>
      <AssignedTasks limit={6} />
    </AssignmentsWrapper>
  </Container>
);

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

const AssignmentHeader = styled.div`
  background-color: ${props => props.theme.neutralLight};
  background-clip: border-box;
  width: 100%;
  margin: auto;
  display: inline-block;
`;

const AssignmentsWrapper = styled.div`
  margin-top: 0.5em;
`;

const Title = styled.h2`
  max-width: 1100px;
  margin: auto;
  padding: 0.5em;
  @media only screen and (max-width: 770px) {
    text-align: center;
  }
  }
`;

export default withSession(AssignmentPage);
