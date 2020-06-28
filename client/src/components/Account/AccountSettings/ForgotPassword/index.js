import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

import useOuterClickNotifier from "../../../Alerts/OuterClickNotifier";
import ErrorMessage from "../../../Alerts/Error";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import * as Styled from "./style";

const FORGOT_PASSWORD = gql`
  mutation($email: String!) {
    forgotPassword(email: $email)
  }
`;

const INITIAL_STATE = {
  email: ""
};

const ForgotPassword = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleForgotPassword @client
    }
  `);

  const { toggleSuccess, toggleForgotPassword } = data;

  const [{ email }, setState] = useState(INITIAL_STATE);

  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD, {
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
      }, 10000);
    }
  }, [client, toggleSuccess]);

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, forgotPassword) => {
    e.preventDefault();
    localStorage.removeItem("token");
    client.resetStore();
    try {
      await forgotPassword({
        variables: {
          email: email
        }
      }).then(async ({ data }) => {
        setState({ ...INITIAL_STATE });
      });
    } catch {}
  };

  const togglePopupModal = () => {
    client.writeData({ data: { toggleForgotPassword: !toggleForgotPassword } });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Styled.Box onSubmit={e => onSubmit(e, forgotPassword)}>
      <Styled.Title>Reset Password</Styled.Title>
      <Styled.Label>
        <Styled.Span>
          <Styled.LabelName>
            Enter the email for the account you wish to reset
          </Styled.LabelName>
        </Styled.Span>
        <Styled.InputConfirmPassword
          name="email"
          value={email}
          onChange={onChange}
          type="email"
        />
      </Styled.Label>
      <Styled.SubmitButton type="submit">Submit</Styled.SubmitButton>
      {loading && <Loading />}
      {toggleSuccess && (
        <SuccessMessage message="Password Reset Email Successfully Sent!" />
      )}
      {error && <ErrorMessage error={error} />}
    </Styled.Box>
  );
};

export default ForgotPassword;
