import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import Loading from "../../../Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import ChangePassword from "../ChangePassword";
import ForgotPassword from "../ForgotPassword";
import { withRouter } from "react-router-dom";

const RESET_PASSWORD = gql`
  mutation($token: String!) {
    resetPassword(token: $token)
  }
`;

const ResetPassword = props => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
    }
  `);

  const { toggleSuccess } = data;

  const [resetStatus, setResetStatus] = useState(false);

  if (props.match.params.token) {
    client.writeData({ data: { paramT: props.match.params.token } });
  }

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
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
    resetPassword({ variables: { token: props.match.params.token } });
  }, []);

  return (
    <div>
      {!resetStatus ? <ChangePassword /> : <ForgotPassword />}
      {loading && <Loading />}
      {toggleSuccess && <SuccessMessage message="Looking good!" />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default withRouter(ResetPassword);
