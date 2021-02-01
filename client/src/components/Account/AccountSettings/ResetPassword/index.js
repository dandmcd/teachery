import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useAtom } from "jotai";

import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import ChangePassword from "../ChangePassword";
import ForgotPassword from "../ForgotPassword";

import { paramTAtom, successAlertAtom } from "../../../../state/store";

const RESET_PASSWORD = gql`
  mutation($token: String!) {
    resetPassword(token: $token)
  }
`;

const ResetPassword = (props) => {
  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [, setParamT] = useAtom(paramTAtom);

  const [resetStatus, setResetStatus] = useState(false);

  if (props.match.params.token) {
    setParamT((a) => (a = props.match.params.token));
  }

  const [resetPassword, { error }] = useMutation(RESET_PASSWORD, {
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
      setResetStatus(true);
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

  useEffect(() => {
    resetPassword({ variables: { token: props.match.params.token } });
  });

  return (
    <div>
      {!resetStatus ? <ChangePassword /> : <ForgotPassword />}
      {successAlert && <SuccessMessage message="Looking good!" />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

ResetPassword.propTypes = {
  props: PropTypes.object,
};

export default withRouter(ResetPassword);
