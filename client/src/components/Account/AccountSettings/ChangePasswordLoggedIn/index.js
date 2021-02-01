import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { useAtom } from "jotai";

import * as Styled from "./style";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import * as routes from "../../../../routing/routes";
import { Link } from "react-router-dom";
import withSession from "../../../Session/withSession";
import {
  customErrorAtom,
  isPasswordChangedAtom,
  successAlertAtom,
} from "../../../../state/store";

const CHANGE_PASSWORD_LOGGED_IN = gql`
  mutation($id: ID!, $password: String!) {
    changePasswordLoggedIn(id: $id, password: $password)
  }
`;

const INITIAL_STATE = {
  password: "",
  passwordConfirmation: "",
};

const ChangePasswordLoggedIn = ({ session }) => {
  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [customError, setCustomError] = useAtom(customErrorAtom);
  const [isPasswordChanged, setIsPasswordChanged] = useAtom(
    isPasswordChangedAtom
  );

  const [{ password, passwordConfirmation }, setState] = useState(
    INITIAL_STATE
  );

  const [changePasswordLoggedIn, { loading, error }] = useMutation(
    CHANGE_PASSWORD_LOGGED_IN,
    {
      onError: (err) => {
        setSuccessAlert((a) => (a = false));
      },
      onCompleted: (data) => {
        setSuccessAlert((a) => (a = true));
      },
    }
  );

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

  const onSubmit = async (e, changePasswordLoggedIn) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setCustomError((c) => (c = "Password doesn't match"));
    } else {
      setCustomError((c) => (c = null));
      try {
        await changePasswordLoggedIn({
          variables: {
            id: session.me.id,
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
        <Styled.Box onSubmit={(e) => onSubmit(e, changePasswordLoggedIn)}>
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
          {error && <ErrorMessage error={error} />}
          {customError && <ErrorMessage customError={customError} />}
        </Styled.Box>
      ) : (
        <>
          <Styled.Box>
            <Styled.Title>
              <Link to={routes.ACCOUNT}>Return to Account</Link>
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

ChangePasswordLoggedIn.propTypes = {
  session: PropTypes.object,
};

export default withSession(ChangePasswordLoggedIn);
