import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import CARDS_QUERY from "./CardListSchema/CardListSchema";
import withAuthorization from "../../../Session/withAuthorization";
import Loading from "../../../Loading";
import CardItem from "../CardItem";
import ErrorMessage from "../../../Alerts/Error/index";
import GoBack from "../../../Navigation/GoBack";
import SuccessMessage from "../../../Alerts/Success";

export const CardList = props => {
  const [isSuccess, setIsSuccess] = useState(false);

  let { id } = props.match.params;
  id = parseInt(id);

  const { data, error, loading } = useQuery(CARDS_QUERY, { variables: { id } });
  if (loading && !data) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

  const { cards } = data.deck;

  return (
    <Fragment>
      <h3>
        <GoBack message="Go Back" /> Card Listing
      </h3>
      {isSuccess && <SuccessMessage message="Card successfully deleted!" />}
      {cards.length === 0 && (
        <div>This deck does not have any cards yet ...</div>
      )}
      {cards.map(card => (
        <CardItem
          key={card.id}
          card={card}
          deckUserId={data.deck.user.id}
          setIsSuccess={setIsSuccess}
        />
      ))}
    </Fragment>
  );
};

export default withAuthorization(session => session && session.me)(
  withRouter(CardList)
);
