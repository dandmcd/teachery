import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Loading from "../Loading";
import * as routes from "../../constants/routes";
import ErrorMessage from "../Alerts/Error";
import * as Styled from "./style";

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

const SignUpPage = ({ history, refetch }) => (
  <Styled.Container>
    <SignUpForm history={history} refetch={refetch} />
  </Styled.Container>
);

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signUp) => {
    signUp().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem("token", data.signUp.token);

      await this.props.refetch();

      this.props.history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    const isInvalid =
      password !== passwordConfirmation ||
      password === "" ||
      email === "" ||
      username === "";

    return (
      <Mutation mutation={SIGN_UP} variables={{ username, email, password }}>
        {(signUp, { data, loading, error }) => (
          <Styled.Box onSubmit={event => this.onSubmit(event, signUp)}>
            <Styled.Title>Sign Up</Styled.Title>
            <Styled.InputUserName
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Username"
            />
            <Styled.InputEmail
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              autoComplete="username"
            />
            <Styled.InputPassword
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
            <Styled.InputConfirmPassword
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
            <Styled.SubmitButton disabled={isInvalid || loading} type="submit">
              Sign Up
            </Styled.SubmitButton>
            {loading && <Loading />}
            {error && <ErrorMessage error={error} />}
          </Styled.Box>
        )}
      </Mutation>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
