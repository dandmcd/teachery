import React, { useState, useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

import ErrorMessage from "../../../Alerts/Error";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import * as Styled from "./style";
import { successAlertAtom } from "../../../../state/store";
import { useAtom } from "jotai";

const FORGOT_PASSWORD = gql`
  mutation($email: String!) {
    forgotPassword(email: $email)
  }
`;

const INITIAL_STATE = {
  email: "",
};

const ForgotPassword = () => {
  const client = useApolloClient();

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);

  const [{ email }, setState] = useState(INITIAL_STATE);

  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD, {
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
    },
  });

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert((a) => (a = false));
      }, 10000);
    }
  }, [successAlert, setSuccessAlert]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, forgotPassword) => {
    e.preventDefault();
    // Clear the cache and any tokens from local storage before running forgotten password logic
    localStorage.removeItem("token");
    client.resetStore();
    try {
      await forgotPassword({
        variables: {
          email: email,
        },
      }).then(async ({ data }) => {
        setState({ ...INITIAL_STATE });
      });
    } catch {}
  };

  return (
    <>
      <Styled.Box onSubmit={(e) => onSubmit(e, forgotPassword)}>
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
        {successAlert && (
          <SuccessMessage message="Password Reset Email Successfully Sent!" />
        )}
        {error && <ErrorMessage error={error} />}
      </Styled.Box>
    </>
  );
};

export default ForgotPassword;
