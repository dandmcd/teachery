import React from "react";
import { withRouter } from "react-router-dom";
import Button from "../../../theme/Button";

const GoBack = ({ history, message }) => (
  <Button onClick={() => history.goBack()}>{message}</Button>
);

export default withRouter(GoBack);
