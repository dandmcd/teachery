import React, { Fragment } from "react";

import bluespinner from "../../assets/bluespinner.gif";

const Loading = () => (
  <Fragment>
    <img
      src={bluespinner}
      alt="Loading..."
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  </Fragment>
);

export default Loading;
