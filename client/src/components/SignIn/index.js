import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";

import { SignUpLink } from "../SignUp";
import Loading from "../Loading";
import * as routes from "../../routing/routes";
import ErrorMessage from "../Alerts/Error";
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

SignInPage.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired
};

const INITIAL_STATE = {
  login: "",
  password: ""
};

const SignInForm = props => {
  const client = useApolloClient();
  // const { data } = useQuery(gql`
  //   query Toggle {
  //     toggleSuccess @client
  //   }
  // `);
  // const { toggleSuccess } = data;

  const [{ login, password }, setState] = useState(INITIAL_STATE);

  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    }
  });

  // useEffect(() => {
  //   if (toggleSuccess) {
  //     setTimeout(() => {
  //       client.writeData({ data: { toggleSuccess: !toggleSuccess } });
  //     }, 5000);
  //   }
  // }, [client, toggleSuccess]);

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
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
        props.history.push(routes.DASHBOARD);
      });
    } catch {}
  };

  return (
    <Styled.Box onSubmit={e => onSubmit(e, signIn)}>
      <Styled.Title>Login</Styled.Title>
      <Styled.Label>
        <Styled.Span>
          <Styled.LabelName>Email or Username</Styled.LabelName>
        </Styled.Span>
        <Styled.InputUserName
          name="login"
          value={login}
          onChange={onChange}
          type="text"
          autoComplete="username"
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
          autoComplete="current-password"
        />
      </Styled.Label>
      <Styled.SubmitButton className="button" disabled={loading} type="submit">
        Sign In
      </Styled.SubmitButton>
      {loading && <Loading />}
      {/* {toggleSuccess && <SuccessMessage message="Successfully Logged In!" />} */}
      {error && <ErrorMessage error={error} />}
      <SignUpLink />
    </Styled.Box>
  );
};

SignInForm.propTypes = {
  props: PropTypes.object
};

export default withRouter(SignInPage);

export { SignInForm };
