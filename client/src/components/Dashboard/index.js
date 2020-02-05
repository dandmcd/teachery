import React from "react";
import styled from "styled-components";
import withAuthorization from "../Session/withAuthorization";
import DashboardPage from "./DashboardPage";
import AddDeckTag from "../FlashCards/Decks/DeckItem/DeckTags/AddDeckTag";
import DeckEdit from "../FlashCards/Decks/DeckEdit";

const Dashboard = () => (
  <Container>
    <AddDeckTag />
    <DeckEdit />
    <DashboardPage />
  </Container>
);

const Container = styled.div`
  z-index: 15;
  max-width: 100%;
  margin: auto;
`;

export default withAuthorization(session => session && session.me)(Dashboard);
