import React from "react";
import styled from "styled-components";
import withAuthorization from "../Session/withAuthorization";
import DashboardPage from "./DashboardPage";
import AddDeckTag from "../FlashCards/Decks/DeckTags/DeckTagCreate";
import DeckEdit from "../FlashCards/Decks/DeckEdit";
import AssignTaskUpdate from "../AssignedTask/AssignedTasks/AssignedTaskEdit";
import Footer from "../Footer";

const Dashboard = () => (
  <Container>
    <AssignTaskUpdate />
    <AddDeckTag />
    <DeckEdit />
    <DashboardPage />
    <Footer />
  </Container>
);

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

export default withAuthorization((session) => session && session.me)(Dashboard);
