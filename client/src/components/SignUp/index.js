import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Loading from "../Loading";
import * as routes from "../../constants/routes";
import ErrorMessage from "../Alerts/Error";
import * as Styled from "./style";
import SuccessMessage from "../Alerts/Success";

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

const SignUpForm = props => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [state, setState] = useState({ ...INITIAL_STATE });

  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    onError: err => {
      setIsSuccess(false);
    },
    onCompleted: data => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  });

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e, signUp) => {
    e.preventDefault();
    try {
      await signUp({
        variables: {
          username: username,
          email: email,
          password: password
        }
      }).then(async ({ data }) => {
        setState({ ...INITIAL_STATE });

        localStorage.setItem("token", data.signUp.token);
        await props.refetch();
        props.history.push(routes.LANDING);
      });
    } catch {}
  };

  const { username, email, password, passwordConfirmation } = state;

  const isInvalid =
    password !== passwordConfirmation ||
    password === "" ||
    email === "" ||
    username === "";

  return (
    <Styled.Box onSubmit={e => onSubmit(e, signUp)}>
      <Styled.Title>Sign Up</Styled.Title>
      <Styled.InputUserName
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        placeholder="Username"
      />
      <Styled.InputEmail
        name="email"
        value={email}
        onChange={onChange}
        type="email"
        placeholder="Email Address"
        autoComplete="username"
        required
      />
      <Styled.InputPassword
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        required
      />
      <Styled.InputConfirmPassword
        name="passwordConfirmation"
        value={passwordConfirmation}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
        autoComplete="new-password"
        required
      />
      <Styled.SubmitButton disabled={isInvalid || loading} type="submit">
        Sign Up
      </Styled.SubmitButton>
      {loading && <Loading />}
      {isSuccess && <SuccessMessage message="Successfully Logged In!" />}
      {error && <ErrorMessage error={error} />}
    </Styled.Box>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
