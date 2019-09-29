import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import withAuthorization from "../../../Session/withAuthorization";
import Loading from "../../../Loading";
import CardItem from "../CardItem";
import ErrorMessage from "../../../Alerts/Error/index";
import GoBack from "../../../Navigation/GoBack";

const CARDS_QUERY = gql`
  query CardsQuery($id: ID!) {
    deck(id: $id) {
      id
      user {
        id
      }
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

export const CardList = props => {
  console.log(props);
  let { id } = props.match.params;
  id = parseInt(id);
  console.log(id);

  return (
    <Fragment>
      <h3>
        <GoBack message="Go Back" /> Card Listing
      </h3>

      <Query query={CARDS_QUERY} variables={{ id }}>
        {({ data, error, loading, fetchMore }) => {
          if (loading && !data) {
            return <Loading />;
          } else if (!data) {
            return <div>This deck does not have any cards yet ...</div>;
          } else if (error) {
            return <ErrorMessage error={error} />;
          }
          console.log(data);
          const { cards } = data.deck;
          return cards.map(card => (
            <CardItem
              key={card.id}
              card={card}
              deckUserId={data.deck.user.id}
            />
          ));
        }}
      </Query>
    </Fragment>
  );
};

export default withAuthorization(session => session && session.me)(
  withRouter(CardList)
);
