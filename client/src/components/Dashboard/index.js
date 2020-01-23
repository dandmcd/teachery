import React from "react";
import styled from "styled-components";
import AssignedTasks from "../Assignment/Assignments";
import { Link } from "react-router-dom";
import withSession from "../Session/withSession";
import withAuthorization from "../Session/withAuthorization";
import DashboardPage from "./DashBoarddd";

const Dashboard = () => <DashboardPage />;

export default withAuthorization(session => session && session.me)(Dashboard);
