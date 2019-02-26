import React from "react";
import { Router, Route } from "react-router-dom";

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
import Search from "../FlashCards/Decks/DeckSearch";
import Tags from "../FlashCards/Decks/DeckItem/TagItem";

import * as routes from "../../constants/routes";
import history from "../../constants/history";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
margin: 0;
  background-color: #f4f4f4;
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i" rel="stylesheet');
  font-family: 'Open Sans', sans-serif;
  color: #233841;

}
a {
  color: #c51f1d;
  text-decoration: none;
}
a:visited {
  color: #a43b37;
}
a:hover {
  color: rgba(164, 59, 55, 0.8);
}
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "content content content"
    "footer footer footer";
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
  grid-gap: 10px;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.div`
  grid-area: content;
`;

const App = ({ session, refetch }) => (
  <Router history={history}>
    <Wrapper>
      <GlobalStyles />

      <Navigation session={session} />
      <Content>
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
          path={routes.SEARCH}
          component={props => <Search {...props} />}
        />
        <Route exact path={routes.TAGS} component={Tags} />
      </Content>
    </Wrapper>
  </Router>
);

export default withSession(App);
