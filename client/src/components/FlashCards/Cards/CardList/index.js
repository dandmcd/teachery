import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";

import CARDS_QUERY from "./CardListSchema/CardListSchema";
import withAuthorization from "../../../Session/withAuthorization";
import Loading from "../../../Loading";
import CardItem from "../CardItem";
import ErrorMessage from "../../../Alerts/Error/index";
import GoBack from "../../../Navigation/GoBack";
import SuccessMessage from "../../../Alerts/Success";

export const CardList = props => {
  const [isSuccess, setIsSuccess] = useState(false);

  console.log(props);
  let { id } = props.match.params;
  id = parseInt(id);
  console.log(id);

  return (
    <Fragment>
      <h3>
        <GoBack message="Go Back" /> Card Listing
      </h3>
      {isSuccess && <SuccessMessage message="Card successfully deleted!" />}
      <Query query={CARDS_QUERY} variables={{ id }}>
        {({ data, error, loading }) => {
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
              setIsSuccess={setIsSuccess}
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
