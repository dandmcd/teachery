import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";

import * as Styled from "./style";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import * as routes from "../../../../routing/routes";
import {
  customErrorAtom,
  successAlertAtom,
  paramTAtom,
  isPasswordChangedAtom,
} from "../../../../state/store";

const CHANGE_PASSWORD = gql`
  mutation($token: String!, $password: String!) {
    changePassword(token: $token, password: $password) {
      token
    }
  }
`;

const INITIAL_STATE = {
  password: "",
  passwordConfirmation: "",
};

const ChangePassword = (props) => {
  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [customError, setCustomError] = useAtom(customErrorAtom);
  const [paramT] = useAtom(paramTAtom);
  const [isPasswordChanged, setIsPasswordChanged] = useAtom(
    isPasswordChangedAtom
  );

  const [{ password, passwordConfirmation }, setState] = useState(
    INITIAL_STATE
  );

  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD, {
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
      }, 5000);
    }
  }, [successAlert, setSuccessAlert]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e, changePassword) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setCustomError((c) => (c = "Password doesn't match"));
    } else {
      setCustomError((c) => (c = null));
      try {
        await changePassword({
          variables: {
            token: paramT,
            password: password,
          },
        }).then(async ({ data }) => {
          setState({ ...INITIAL_STATE });
          setIsPasswordChanged((a) => (a = true));
        });
      } catch {}
    }
  };

  return (
    <>
      {!isPasswordChanged ? (
        <Styled.Box onSubmit={(e) => onSubmit(e, changePassword)}>
          <Styled.Title>Change Password</Styled.Title>
          <Styled.Label>
            <Styled.Span>
              <Styled.LabelName>New Password</Styled.LabelName>
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
              <Styled.LabelName>Confirm New Password</Styled.LabelName>
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
          <Styled.SubmitButton type="submit" disabled={loading}>
            Submit
          </Styled.SubmitButton>

          {loading && <Loading />}
          {successAlert && <SuccessMessage message="Token is verified!" />}
          {error && <ErrorMessage error={error} />}
          {customError && <ErrorMessage customError={customError} />}
        </Styled.Box>
      ) : (
        <>
          <Styled.Box>
            <Styled.Title>
              <Link to={routes.SIGN_IN}>Go to Sign In</Link>
            </Styled.Title>
            {successAlert && (
              <SuccessMessage message="Password Change Successful!" />
            )}
          </Styled.Box>
        </>
      )}
    </>
  );
};

ChangePassword.propTypes = {
  props: PropTypes.object,
};

export default ChangePassword;
