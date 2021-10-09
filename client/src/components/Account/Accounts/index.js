import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as routes from "../../../routing/routes";
import * as Styled from "./style";
import withSession from "../../Session/withSession";
import ToggleTheme from "../AccountSettings/ToggleTheme";

const Account = ({ session, props }) => {
  // Toggle hiding Account sections
  const [accountChecked, setAccountChecked] = useState(false);
  const [personalizeChecked, setPersonalizeChecked] = useState(false);
  const toggleAccountSection = () => {
    setAccountChecked(accountChecked === false ? true : false);
  };
  const togglePersonalize = () => {
    setPersonalizeChecked(personalizeChecked === false ? true : false);
  };

  return (
    <>
      <Styled.Header>
        <Styled.SubMenu>
          <Styled.PopupFooterButton
            type="checkbox"
            title={!accountChecked ? "Collapse" : "Expand"}
            checked={accountChecked}
            onClick={toggleAccountSection}
          >
            <Styled.CloseSpan tasksChecked={accountChecked} />
          </Styled.PopupFooterButton>
          <Styled.SubTitle>Account Details</Styled.SubTitle>
        </Styled.SubMenu>
      </Styled.Header>
      {!accountChecked ? (
        <Styled.Container>
          <Styled.Field>
            Account Username: <Styled.Span>{session.me.username}</Styled.Span>
          </Styled.Field>
          <Styled.Field>
            Account Email: <Styled.Span>{session.me.email}</Styled.Span>
          </Styled.Field>
          <Styled.Field>
            Role:{" "}
            <Styled.Span>
              {session.me.role.charAt(0).toUpperCase() +
                session.me.role.slice(1).toLowerCase()}
            </Styled.Span>
          </Styled.Field>
          <Styled.Field>
            Password:{" "}
            <Link to={routes.CHANGE_PASSWORD_LOGGED_IN}>
              <Styled.ChangePasswordButton>
                Change Password
              </Styled.ChangePasswordButton>
            </Link>
          </Styled.Field>
        </Styled.Container>
      ) : null}
      <Styled.Header>
        <Styled.SubMenu>
          <Styled.PopupFooterButton
            type="checkbox"
            title={!personalizeChecked ? "Collapse" : "Expand"}
            checked={personalizeChecked}
            onClick={togglePersonalize}
          >
            <Styled.CloseSpan tasksChecked={personalizeChecked} />
          </Styled.PopupFooterButton>
          <Styled.SubTitle>Personalize</Styled.SubTitle>
        </Styled.SubMenu>
      </Styled.Header>
      {!personalizeChecked ? <ToggleTheme props={props} /> : null}
    </>
  );
};

Account.propTypes = {
  session: PropTypes.object,
  props: PropTypes.object,
};

export default withSession(Account);
