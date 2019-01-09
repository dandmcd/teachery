import { PubSub } from "graphql-subscriptions";

import * as MESSAGE_EVENTS from "./message";
import * as ASSIGNMENT_EVENTS from "./assignment";

export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
  ASSIGNMENT: ASSIGNMENT_EVENTS
};

export default new PubSub();
