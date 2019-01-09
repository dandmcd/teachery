import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import withAuthorization from "../../Session/withAuthorization";

import Loading from "../../Loading";
import CardDeck from "./CardDeck";

const CARDS_QUERY = gql`
  query CardsQuery($id: ID!) {
    deck(id: $id) {
      id
      deckName
      cards {
        id
        front
        back
      }
    }
  }
`;

export class Cards extends Component {
  render() {
    let { id } = this.props.match.params;
    id = parseInt(id);

    return (
      <Query query={CARDS_QUERY} variables={{ id }}>
        {({ data, error, loading }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <p>Error</p>;
          }

          return <CardDeck cards={data.deck.cards} />;
        }}
      </Query>
    );
  }
}

export default withAuthorization(session => session && session.me)(Cards);
