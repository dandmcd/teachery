import React from "react";
import PropTypes from "prop-types";
import withSession from "../../../Session/withSession";
import AssignedTaskItemBase from "../AssignedTaskItem";
import * as Styled from "../style";

const AssignedTaskList = ({ assignedTasks, me }) => {
  return (
    <Styled.AssignmentContainer>
      {assignedTasks.map((assignedTask) => (
        <AssignedTaskItem
          key={assignedTask.id}
          assignedTask={assignedTask}
          me={me}
        />
      ))}
    </Styled.AssignmentContainer>
  );
};

AssignedTaskList.propTypes = {
  assignedTasks: PropTypes.array.isRequired,
  me: PropTypes.object,
};

const AssignedTaskItem = withSession(AssignedTaskItemBase);

export default AssignedTaskList;
