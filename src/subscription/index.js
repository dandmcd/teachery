import { PubSub } from "graphql-subscriptions";

import * as MESSAGE_EVENTS from "./message";

export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS
};

export default new PubSub();
