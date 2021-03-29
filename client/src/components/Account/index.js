import React from "react";
import PropTypes from "prop-types";

import withAuthorization from "../Session/withAuthorization";
import Account from "./Accounts";
import * as Styled from "./style";

const AccountPage = (props) => (
  <>
    <Styled.Header>
      <Styled.Menu>
        <Styled.Title>Account Settings</Styled.Title>
      </Styled.Menu>
    </Styled.Header>
    <Account props={props} />
  </>
);

AccountPage.propTypes = {
  props: PropTypes.object,
};

export default withAuthorization((session) => session && session.me)(
  AccountPage
);
