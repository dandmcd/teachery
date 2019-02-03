import React from "react";

import withSession from "../Session/withSession";

import { MessageCreate, Messages } from "../Message";

const Landing = ({ session }) => (
  <div>
    <h2>Welcome</h2>
    <hr />
    <hr />
    {session && session.me && <MessageCreate />}
    {session && session.me && <Messages limit={3} />}
  </div>
);

export default withSession(Landing);
