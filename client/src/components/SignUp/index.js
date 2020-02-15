import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";

import Loading from "../Loading";
import * as routes from "../../routing/routes";
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

const SignUpPage = ({ history, refetch }) => (
  <Styled.Container>
    <SignUpForm history={history} refetch={refetch} />
  </Styled.Container>
);

SignUpPage.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired
};

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

const SignUpForm = props => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
    }
  `);
  const { toggleSuccess } = data;

  const [
    { username, email, password, passwordConfirmation },
    setState
  ] = useState(INITIAL_STATE);

  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    }
  });

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
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

  const isInvalid =
    password !== passwordConfirmation ||
    password === "" ||
    email === "" ||
    username === "";

  return (
    <Styled.Box onSubmit={e => onSubmit(e, signUp)}>
      <Styled.Title>Sign Up</Styled.Title>
      <Styled.Label>
        <Styled.Span>
          <Styled.LabelName>Username</Styled.LabelName>
        </Styled.Span>
        <Styled.InputUserName
          name="username"
          value={username}
          onChange={onChange}
          type="text"
        />
      </Styled.Label>
      <Styled.Label>
        <Styled.Span>
          <Styled.LabelName>Email Address</Styled.LabelName>
        </Styled.Span>
        <Styled.InputEmail
          name="email"
          value={email}
          onChange={onChange}
          type="email"
          autoComplete="username"
          required
        />
      </Styled.Label>
      <Styled.Label>
        <Styled.Span>
          <Styled.LabelName>Password</Styled.LabelName>
        </Styled.Span>
        <Styled.InputPassword
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          autoComplete="new-password"
          required
        />
      </Styled.Label>
      <Styled.Label>
        <Styled.Span>
          <Styled.LabelName>Confirm Password</Styled.LabelName>
        </Styled.Span>
        <Styled.InputConfirmPassword
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={onChange}
          type="password"
          autoComplete="new-password"
          required
        />
      </Styled.Label>
      <Styled.SubmitButton disabled={isInvalid || loading} type="submit">
        Sign Up
      </Styled.SubmitButton>
      {loading && <Loading />}
      {toggleSuccess && <SuccessMessage message="Successfully Logged In!" />}
      {error && <ErrorMessage error={error} />}
    </Styled.Box>
  );
};

SignUpForm.propTypes = {
  props: PropTypes.object
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
