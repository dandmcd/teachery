import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import * as routes from "../../../routing/routes";
import * as Styled from "./style";
import withSession from "../../Session/withSession";

const Account = ({ session }) => {
  const [accountChecked, setAccountChecked] = useState(false);

  const toggleAccountSection = () => {
    setAccountChecked(accountChecked === false ? true : false);
  };

  return (
    <Fragment>
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
          <Styled.SubTitle>Account Information</Styled.SubTitle>
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
    </Fragment>
  );
};

export default withSession(Account);
