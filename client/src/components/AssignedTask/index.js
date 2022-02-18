import React from "react";

import * as Styled from "./style";
import withSession from "../Session/withSession";
import AssignedTasks from "./AssignedTasks";
import AssignTaskUpdate from "./AssignedTasks/AssignedTaskEdit";
import NoteList from "../Note/NoteList";
import { useAtom } from "jotai";
import { modalAtom } from "../../state/store";

const AssignmentPage = () => {
  const [modal] = useAtom(modalAtom);

  return (
    <Styled.Container>
      <Styled.AssignmentHeader>
        <AssignTaskUpdate />
        {modal.target === "notemodal" && <NoteList />}
        <Styled.Title>Assignments</Styled.Title>
      </Styled.AssignmentHeader>
      <Styled.AssignmentsWrapper>
        <AssignedTasks limit={6} />
      </Styled.AssignmentsWrapper>
    </Styled.Container>
  );
};

export default withSession(AssignmentPage);
