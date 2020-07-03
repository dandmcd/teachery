import React, { useState, useLayoutEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

import * as routes from "../../routing/routes";
import history from "../../routing/history";

import Navigation from "../Navigation";
import Landing from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import AssignmentPage from "../AssignedTask";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import withSession from "../Session/withSession";
import FlashCardPage from "../FlashCards";
import Cards from "../FlashCards/Cards/CardPractice";
import CardList from "../FlashCards/Cards/CardList";
import Search from "../FlashCards/Decks/DeckSearch";
import Tags from "../FlashCards/Decks/DeckTags";
import Dashboard from "../Dashboard";
import TeacherPage from "../Teacher/";
import GlobalStyle from "../../theme/globalStyle";
import ForgotPassword from "../Account/AccountSettings/ForgotPassword";
import ResetPassword from "../Account/AccountSettings/ResetPassword";
import ChangePassword from "../Account/AccountSettings/ChangePassword";
import ConfirmAccount from "../Account/AccountSettings/ConfirmAccount/ConfirmAccount";
import ChangePasswordLoggedIn from "../Account/AccountSettings/ChangePasswordLoggedIn";
import { lightTheme, darkTheme, iceTheme } from "../../theme/theme";
import PageNotFound from "../Navigation/PageNotFound";

const App = ({ session, refetch }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [componentMounted, setComponentMounted] = useState(false);

  useLayoutEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      !localTheme
    ) {
      setTheme(darkTheme);
    } else if (localTheme === "dark") {
      setTheme(darkTheme);
    } else if (localTheme === "ice") {
      setTheme(iceTheme);
    } else {
      setTheme(lightTheme);
    }
    setComponentMounted(true);
  }, []);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navigation session={session} />
        <Container>
          <Switch>
            <Route exact path={routes.LANDING} component={() => <Landing />} />
            <Route
              exact
              path={routes.DASHBOARD}
              component={() => <Dashboard />}
            />
            <Route
              exact
              path={routes.SIGN_UP}
              component={() => <SignUpPage refetch={refetch} />}
            />
            <Route
              exact
              path={routes.FORGOT_PASSWORD}
              component={() => <ForgotPassword refetch={refetch} />}
            />
            <Route
              exact
              path={routes.SIGN_IN}
              component={() => <SignInPage refetch={refetch} />}
            />
            <Route
              exact
              path={routes.ACCOUNT}
              render={(props) => <AccountPage {...props} setTheme={setTheme} />}
            />
            <Route
              exact
              path={routes.ASSIGNMENTS}
              component={() => <AssignmentPage />}
            />
            <Route exact path={routes.ADMIN} component={() => <AdminPage />} />
            <Route
              exact
              path={routes.TEACHER}
              component={() => <TeacherPage />}
            />
            <Route
              exact
              path={routes.FLASHCARDS}
              component={() => <FlashCardPage />}
            />
            <Route
              exact
              path={routes.CARDS}
              component={(props) => <Cards {...props} />}
            />
            <Route
              exact
              path={routes.CARDLIST}
              component={(props) => <CardList {...props} />}
            />
            <Route exact path={routes.SEARCH} component={() => <Search />} />
            <Route exact path={routes.TAGS} component={Tags} />
            <Route
              exact
              path={routes.RESET_PASSWORD}
              component={() => <ResetPassword refetch={refetch} />}
            />
            <Route
              exact
              path={routes.CONFIRM_ACCOUNT}
              component={() => <ConfirmAccount refetch={refetch} />}
            />
            <Route
              exact
              path={routes.CHANGE_PASSWORD}
              component={() => <ChangePassword refetch={refetch} />}
            />
            <Route
              exact
              path={routes.CHANGE_PASSWORD_LOGGED_IN}
              component={() => <ChangePasswordLoggedIn refetch={refetch} />}
            />
            <Route path="*" component={() => <PageNotFound />} />
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

App.propTypes = {
  session: PropTypes.object,
  refetch: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: block;
  margin: auto;
  /* padding-left: 15px;
  padding-right: 15px; */
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
