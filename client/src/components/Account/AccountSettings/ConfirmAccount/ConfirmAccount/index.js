import React, { useState, useEffect, Fragment } from "react";
import gql from "graphql-tag";
import { useApolloClient, useQuery, useMutation } from "@apollo/react-hooks";

import * as routes from "../../../../../routing/routes";
import * as Styled from "./style";
import { Link, withRouter } from "react-router-dom";
import SuccessMessage from "../../../../Alerts/Success";
import ErrorMessage from "../../../../Alerts/Error";

const CONFIRM_ACCOUNT = gql`
  mutation($token: String!) {
    confirmUser(token: $token)
  }
`;

const ConfirmAccount = props => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      paramT @client
    }
  `);

  console.log(props);

  const { toggleSuccess } = data;

  const [resetStatus, setResetStatus] = useState(false);

  const [confirmUser, { loading, error }] = useMutation(CONFIRM_ACCOUNT, {
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
      setResetStatus(true);
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    }
  });

  console.log(resetStatus);
  useEffect(() => {
    confirmUser({ variables: { token: props.match.params.token } });
  }, []);

  return (
    <Fragment>
      <Styled.Box>
        <Styled.Title>
          <Link to={routes.SIGN_IN}>Go to Sign In</Link>
        </Styled.Title>
        {toggleSuccess && (
          <SuccessMessage message="Account Confirmed!  Please sign in!" />
        )}
        {error && <ErrorMessage error={error} />}
      </Styled.Box>
    </Fragment>
  );
};

export default withRouter(ConfirmAccount);
