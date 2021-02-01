import React, { useEffect, Fragment } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import * as routes from "../../../../../routing/routes";
import * as Styled from "./style";
import SuccessMessage from "../../../../Alerts/Success";
import ErrorMessage from "../../../../Alerts/Error";
import { successAlertAtom } from "../../../../../state/store";

const CONFIRM_ACCOUNT = gql`
  mutation($token: String!) {
    confirmUser(token: $token)
  }
`;

const ConfirmAccount = (props) => {
  const [successAlert, setSuccessAlert] = successAlertAtom;

  const [confirmUser, { error }] = useMutation(CONFIRM_ACCOUNT, {
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
    },
  });

  useEffect(() => {
    confirmUser({ variables: { token: props.match.params.token } });
  });

  return (
    <Fragment>
      <Styled.Box>
        <Styled.Title>
          <Link to={routes.SIGN_IN}>Go to Sign In</Link>
        </Styled.Title>
        {successAlert && (
          <SuccessMessage message="Account Confirmed!  Please sign in!" />
        )}
        {error && <ErrorMessage error={error} />}
      </Styled.Box>
    </Fragment>
  );
};

ConfirmAccount.propTypes = {
  props: PropTypes.object,
};

export default withRouter(ConfirmAccount);
