import React from "react";

import withSession from "../Session/withSession";

import { MessageCreate, Messages } from "../Message";

const Landing = ({ session }) => (
  <div>
    <h2>This is the landing page yep</h2>

    {session && session.me && <MessageCreate />}
    {session && session.me && <Messages me={session.me} limit={2} />}
  </div>
);

export default withSession(Landing);
