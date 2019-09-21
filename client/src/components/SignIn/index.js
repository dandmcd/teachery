import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { SignUpLink } from "../SignUp";
import Loading from "../Loading";
import * as routes from "../../constants/routes";
import ErrorMessage from "../Error";
import * as Styled from "./style";

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

const SignInPage = ({ history, refetch }) => (
  <Styled.Container>
    <SignInForm history={history} refetch={refetch} />
  </Styled.Container>
);

const INITIAL_STATE = {
  login: "",
  password: ""
};

class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem("token", data.signIn.token);

      await this.props.refetch();

      this.props.history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const { login, password } = this.state;

    const isInvalid = password === "" || login === "";

    return (
      <Mutation mutation={SIGN_IN} variables={{ login, password }}>
        {(signIn, { data, loading, error }) => (
          <Styled.Box onSubmit={event => this.onSubmit(event, signIn)}>
            <Styled.Title>Login</Styled.Title>
            <Styled.InputUserName
              name="login"
              value={login}
              onChange={this.onChange}
              type="text"
              placeholder="Email or Username"
              autoComplete="username"
            />
            <Styled.InputPassword
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <Styled.SubmitButton
              className="button"
              disabled={isInvalid || loading}
              type="submit"
            >
              Sign In
            </Styled.SubmitButton>
            {loading && <Loading />}
            {error && <ErrorMessage error={error} />}
            <SignUpLink />
          </Styled.Box>
        )}
      </Mutation>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
