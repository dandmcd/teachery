import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";

import * as routes from "../../routing/routes";
import { GET_ME } from "./queries";

const withAuthorization = conditionFn => Component => props => {
  const { data, networkStatus } = useQuery(GET_ME);
  if (networkStatus < 7) {
    return null;
  }
  return conditionFn(data) ? (
    <Component {...props} />
  ) : (
    <Redirect to={routes.SIGN_IN} />
  );
};

export default withAuthorization;
