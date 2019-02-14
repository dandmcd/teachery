import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Loading from "../../Loading";
import DeckItem from "./DeckItem";

const GET_DECKS = gql`
  query DeckQuery {
    decks @connection(key: "DeckConnection") {
      edges {
        id
        deckname
        description
        createdAt
        tags {
          id
          tagname
        }
      }
    }
  }
`;

class Decks extends Component {
  render() {
    return (
      <Fragment>
        <h1>Deck</h1>
        <Query query={GET_DECKS}>
          {({ data, error, loading }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <p>Error</p>;
            }

            const decksToRender = data.decks.edges;

            return (
              <Fragment>
                {console.log(decksToRender)}
                {decksToRender.map(deck => (
                  <DeckItem key={deck.id} deck={deck} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Decks;
