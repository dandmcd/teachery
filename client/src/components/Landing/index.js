import React from "react";

import withSession from "../Session/withSession";

import { MessageCreate, Messages } from "../Message";
import { Assignments } from "../Assignment";

const Landing = ({ session }) => (
  <div>
    <h2>Welcome</h2>
    <hr />
    {session && session.me && <Assignments me={session.me} limit={2} />}
    <hr />
    {session && session.me && <MessageCreate />}
    {session && session.me && <Messages limit={3} />}
  </div>
);

export default withSession(Landing);
