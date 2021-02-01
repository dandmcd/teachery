import React from "react";
import { Link } from "react-router-dom";

import NoData from "../../Alerts/NoData";
import * as routes from "../../../routing/routes";

const PageNotFound = () => {
  return (
    <>
      <Link to={routes.LANDING}>
        <NoData title="404 Page Not Found" message="Please return to Home" />
      </Link>
    </>
  );
};

export default PageNotFound;
