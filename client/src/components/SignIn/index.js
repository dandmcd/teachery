import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { SignUpLink } from "../SignUp";
import * as routes from "../../constants/routes";
import ErrorMessage from "../Error";

const Button = styled.button`
  background: transparent;
  border-radius: 2px;
  border: 2px solid papayawhip;
  color: slategray;
  margin: 0.1em;
  padding: 0.25em 1em;
  ${Button} :disabled & {
    background: black;
  }
`;

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

const SignInPage = ({ history, refetch }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} refetch={refetch} />
    <SignUpLink />
  </div>
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
          <form onSubmit={event => this.onSubmit(event, signIn)}>
            <input
              name="login"
              value={login}
              onChange={this.onChange}
              type="text"
              placeholder="Email or Username"
              autoComplete="username"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              autoComplete="password"
            />
            <Button disabled={isInvalid || loading} type="submit">
              Sign In
            </Button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
