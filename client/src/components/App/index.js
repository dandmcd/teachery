import React, { useState, useEffect } from "react";
import { Router, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

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
import Dashboard from "../Dashboard";
import TeacherPage from "../Teacher/";
import GlobalStyle from "../../theme/globalStyle";
import ForgotPassword from "../Account/AccountSettings/ForgotPassword";
import ResetPassword from "../Account/AccountSettings/ResetPassword";
import ChangePassword from "../Account/AccountSettings/ChangePassword";
import ConfirmAccount from "../Account/AccountSettings/ConfirmAccount/ConfirmAccount";
import ChangePasswordLoggedIn from "../Account/AccountSettings/ChangePasswordLoggedIn";
import { lightTheme, darkTheme, iceTheme } from "../../theme/theme";
import ToggleTheme from "../../theme/ToggleTheme";
import { useDarkMode } from "../../theme/ToggleTheme/useDarkMode";

const App = ({ session, refetch }) => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const themeMode = () => {
    if (theme === "light") {
      return lightTheme;
    } else if (theme === "dark") {
      return darkTheme;
    } else {
      return iceTheme;
    }
  };

  if (!componentMounted) {
    return <div />;
  }
  return (
    <Router history={history}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <Navigation session={session} />
        <Container>
          <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
          <Route
            exact
            path={routes.LANDING}
            component={() => <LandingPage />}
          />
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
            component={() => <AccountPage />}
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
            component={props => <Cards {...props} />}
          />
          <Route
            exact
            path={routes.CARDLIST}
            component={props => <CardList {...props} />}
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
        </Container>
      </ThemeProvider>
    </Router>
  );
};

App.propTypes = {
  session: PropTypes.object,
  refetch: PropTypes.func.isRequired
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
