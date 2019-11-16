import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { getMainDefinition } from "apollo-utilities";
import { ApolloLink, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import axios from "axios";
import { buildAxiosFetch } from "@lifeomic/axios-fetch";
import { ThemeProvider } from "styled-components";

import { resolvers, typeDefs } from "./state/resolvers";
import App from "./components/App";
import { signOut } from "./components/SignOut";
import theme from "./theme/theme";

const httpLink = new HttpLink({
  fetch: buildAxiosFetch(axios, (config, input, init) => ({
    ...config,
    onUploadProgress: init.onUploadProgress
  })),
  uri: "/graphql"
});

//Production use wss://fuwuyuan.herokuapp.com/graphql
const wsLink = new WebSocketLink({
  uri: `wss://fuwuyuan.herokuapp.com/graphql`,
  options: {
    reconnect: true
  }
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers = { ...headers, "x-token": token };
    }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log("GraphQL error:", message);

      if (message === "UNAUTHENTICATED") {
        signOut(client);
      } else {
        if (
          message ===
          "Context creation failed: Your session expired. Sign in again."
        ) {
          signOut(client);
        }
      }
    });
  }

  if (networkError) {
    console.log("Network error", networkError);

    if (networkError.statusCode === 401) {
      signOut(client);
    }
  }
});

const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id
});

const client = new ApolloClient({
  fetchOptions: { fetch },
  link,
  cache,
  typeDefs,
  resolvers
});

const data = {
  toggleLanding: 0,
  togglePopup: false,
  toggleAddCard: false,
  toggleEditCard: false,
  toggleAddTag: false,
  toggleAssign: false,
  toggleSuccess: false,
  toggleDeleteSuccess: false,
  toggleRoleChange: false,
  isCard: false,
  isDeck: false,
  isDocument: false,
  isSubmitting: false,
  assignmentId: null,
  current: null,
  editImg: false,
  search: {
    __typename: "Search",
    showPopup: false,
    noResult: false,
    tagName: "",
    tags: []
  }
};

cache.writeData({ data });

client.onResetStore(async () => cache.writeData({ data }));
client.onClearStore(async () => {
  cache.writeData({ data });
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
