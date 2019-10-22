import React from "react";
import { withRouter } from "react-router-dom";
import { shuffle } from "lodash";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";

import withAuthorization from "../../Session/withAuthorization";
import Loading from "../../Loading";
import CardDeck from "./CardDeck";
import ErrorMessage from "../../Alerts/Error";

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
      }
    }
  }
`;

export const Cards = props => {
  let { id } = props.match.params;
  id = parseInt(id);

  const { data, error, loading } = useQuery(CARDS_QUERY, { variables: { id } });
  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const shuffledCards = shuffle(data.deck.cards);
  const withCount = shuffledCards.slice(
    0,
    parseInt(props.location.state.count)
  );

  return <CardDeck cards={withCount} />;
};

Cards.propTypes = {
  props: PropTypes.object
};

export default withAuthorization(session => session && session.me)(
  withRouter(Cards)
);
