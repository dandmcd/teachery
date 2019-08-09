import React from "react";
//Do we need withRouter here?
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import withAuthorization from "../../../Session/withAuthorization";
import Loading from "../../../Loading";
import CardItem from "../CardItem";

const CARDS_QUERY = gql`
  query CardsQuery($id: ID!) {
    deck(id: $id) {
      id
      cards {
        id
        front
        back
        pictureName
        pictureUrl
        createdAt
      }
    }
  }
`;

export const CardList = (props, { deck }) => {
  console.log(props);
  let { id } = props.match.params;
  id = parseInt(id);
  console.log(id);

  return (
    <Query query={CARDS_QUERY} variables={{ id }}>
      {({ data, error, loading }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <p>Error</p>;
        }
        console.log(data.deck);
        const { cards } = data.deck;
        console.log(cards);
        return cards.map(card => <CardItem key={card.id} card={card} />);
      }}
    </Query>
  );
};

export default withAuthorization(session => session && session.me)(
  withRouter(CardList)
);
