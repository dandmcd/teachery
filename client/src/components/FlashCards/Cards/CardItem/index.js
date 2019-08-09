import React from "react";
import Moment from "react-moment";

const CardItem = ({ card, session }) => {
  return (
    <div>
      <h4>Card Front: {card.front}</h4>
      <h4>Card Back: {card.back}</h4>
      <h4>
        Image:{" "}
        <a href={card.pictureUrl} rel="noopener noreferrer" target="_blank">
          {card.pictureUrl}
        </a>
      </h4>
      <h6>
        Created on: <Moment format="YYYY-MM-DD HH:mm">{card.createdAt}</Moment>
      </h6>
      <hr />
    </div>
  );
};

export default CardItem;
