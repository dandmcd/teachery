import React, { useState, useEffect, Fragment } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";

import * as Styled from "./style";
import Loading from "../../../Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import * as routes from "../../../../routing/routes";
import { Link } from "react-router-dom";
import withSession from "../../../Session/withSession";

const CHANGE_PASSWORD_LOGGED_IN = gql`
  mutation($id: ID!, $password: String!) {
    changePasswordLoggedIn(id: $id, password: $password)
  }
`;

const INITIAL_STATE = {
  id: null,
  password: "",
  passwordConfirmation: ""
};

const ChangePasswordLoggedIn = ({ session }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      customError @client
      isSuccessfulChange @client
    }
  `);
  const { toggleSuccess, customError, isSuccessfulChange } = data;

  const [{ id, password, passwordConfirmation }, setState] = useState(
    INITIAL_STATE
  );

  const [changePasswordLoggedIn, { loading, error }] = useMutation(
    CHANGE_PASSWORD_LOGGED_IN,
    {
      onError: err => {
        client.writeData({ data: { toggleSuccess: false } });
      },
      onCompleted: data => {
        client.writeData({ data: { toggleSuccess: true } });
      }
    }
  );

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

  const onSubmit = async (e, changePasswordLoggedIn) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      client.writeData({ data: { customError: "Password doesn't match" } });
    } else {
      client.writeData({ data: { customError: null } });
      try {
        await changePasswordLoggedIn({
          variables: {
            id: session.me.id,
            password: password
          }
        }).then(async ({ data }) => {
          setState({ ...INITIAL_STATE });
          client.writeData({ data: { isSuccessfulChange: true } });
        });
      } catch {}
    }
  };

  return (
    <Fragment>
      {!isSuccessfulChange ? (
        <Styled.Box onSubmit={e => onSubmit(e, changePasswordLoggedIn)}>
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
        <Fragment>
          <Styled.Box>
            <Styled.Title>
              <Link to={routes.ACCOUNT}>Return to Account</Link>
            </Styled.Title>
            {toggleSuccess && (
              <SuccessMessage message="Password Change Successful!" />
            )}
          </Styled.Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default withSession(ChangePasswordLoggedIn);
