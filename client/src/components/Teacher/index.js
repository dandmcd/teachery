import React from "react";

import withAuthorization from "../Session/withAuthorization";
import { MessageCreate, Messages } from "../Message";
import AssignmentCreate from "../Assignment/AssignmentCreate";
import Assignments from "../Assignment/AssignmentAdmin";
import AssignTask from "../Assignment/AssignmentAdmin/AssignTask";
import AssignTaskUpdate from "../Assignment/AssignmentAdmin/AssignTaskUpdate";
import TeacherAssignedTasks from "./TeacherAssignedTasks";

const TeacherPage = () => (
  <div>
    <h1>Teacher Admin</h1>
    <hr />
    <MessageCreate />
    <Messages limit={3} />
    <hr />
    <AssignmentCreate />
    <AssignTask />
    <Assignments limit={3} />
    <hr />
    <AssignTaskUpdate />
    <TeacherAssignedTasks limit={4} />
  </div>
);

export default withAuthorization(
  session =>
    (session && session.me && session.me.role === "TEACHER") ||
    (session && session.me && session.me.role === "ADMIN")
)(TeacherPage);
