import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "../../../theme/Button";

const GoBack = ({ history, message }) => (
  <Button onClick={() => history.goBack()}>{message}</Button>
);

GoBack.propTypes = {
  history: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
};

export default withRouter(GoBack);
