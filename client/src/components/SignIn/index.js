import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { SignUpLink } from "../SignUp";
import Loading from "../Loading";
import * as routes from "../../constants/routes";
import ErrorMessage from "../Alerts/Error";
import * as Styled from "./style";
import SuccessMessage from "../Alerts/Success";

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

const SignInForm = props => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [state, setState] = useState({ ...INITIAL_STATE });

  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
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

  const onSubmit = async (e, signIn) => {
    e.preventDefault();
    try {
      await signIn({
        variables: {
          login: login,
          password: password
        }
      }).then(async ({ data }) => {
        setState({ ...INITIAL_STATE });

        localStorage.setItem("token", data.signIn.token);
        await props.refetch();
        props.history.push(routes.LANDING);
      });
    } catch {}
  };

  const { login, password } = state;

  return (
    <Styled.Box onSubmit={e => onSubmit(e, signIn)}>
      <Styled.Title>Login</Styled.Title>
      <Styled.InputUserName
        name="login"
        value={login}
        onChange={onChange}
        type="text"
        placeholder="Email or Username"
        autoComplete="username"
      />
      <Styled.InputPassword
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
      />
      <Styled.SubmitButton className="button" disabled={loading} type="submit">
        Sign In
      </Styled.SubmitButton>
      {loading && <Loading />}
      {isSuccess && <SuccessMessage message="Successfully Logged In!" />}
      {error && <ErrorMessage error={error} />}
      <SignUpLink />
    </Styled.Box>
  );
};

export default withRouter(SignInPage);

export { SignInForm };
