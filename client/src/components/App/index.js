import React from "react";
import { Router, Route } from "react-router-dom";
import styled from "styled-components";

import * as routes from "../../routing/routes";
import history from "../../routing/history";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import AssignmentPage from "../Assignment";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import withSession from "../Session/withSession";
import FlashCardPage from "../FlashCards";
import Cards from "../FlashCards/Cards";
import CardList from "../FlashCards/Cards/CardList";
import Search from "../FlashCards/Decks/DeckSearch";
import Tags from "../FlashCards/Decks/DeckItem/DeckTags/TagItem";
import TeacherPage from "../Teacher";

import GlobalStyle from "../../theme/globalStyle";

const App = ({ session, refetch }) => (
  <Router history={history}>
    <GlobalStyle />
    <Navigation session={session} />
    <Container>
      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route
        exact
        path={routes.SIGN_UP}
        component={() => <SignUpPage refetch={refetch} />}
      />
      <Route
        exact
        path={routes.SIGN_IN}
        component={() => <SignInPage refetch={refetch} />}
      />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route
        exact
        path={routes.ASSIGNMENTS}
        component={() => <AssignmentPage />}
      />
      <Route exact path={routes.ADMIN} component={() => <AdminPage />} />
      <Route exact path={routes.TEACHER} component={() => <TeacherPage />} />
      <Route
        exact
        path={routes.FLASHCARDS}
        component={() => <FlashCardPage />}
      />
      <Route
        exact
        path={routes.CARDS}
        component={props => <Cards {...props} />}
      />
      <Route
        exact
        path={routes.CARDLIST}
        component={props => <CardList {...props} />}
      />
      <Route exact path={routes.SEARCH} component={() => <Search />} />
      <Route exact path={routes.TAGS} component={Tags} />
    </Container>
  </Router>
);

const Container = styled.div`
  max-width: 1100px;
  display: block;
  margin: auto;
  padding-left: 15px;
  padding-right: 15px;
  overflow: hidden;
  vertical-align: top;
  position: relative;
  top: 60px;
  z-index: 1;
  @media only screen and (max-device-width: 330px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export default withSession(App);
