import React from "react";

import withAuthorization from "../Session/withAuthorization";
import { MessageCreate, Messages } from "../Message";
import RoleChange from "./Roles";
import * as Styled from "./style";

const AdminPage = () => (
  <Styled.Container>
    <Styled.Header>
      <Styled.Menu>
        <Styled.Title>Admin</Styled.Title>
      </Styled.Menu>
    </Styled.Header>
    <Styled.Menu>
      <RoleChange />
    </Styled.Menu>
    <Styled.Hr />
    <Messages limit={3} />
    <MessageCreate />
  </Styled.Container>
);

export default withAuthorization(
  (session) => session && session.me && session.me.role === "ADMIN"
)(AdminPage);
