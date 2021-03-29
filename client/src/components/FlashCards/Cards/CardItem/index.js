import React, { useState } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

import withSession from "../../../Session/withSession";
import CardDelete from "../CardDelete";
import * as Styled from "./style";
import { useAtom } from "jotai";
import { modalAtom } from "../../../../state/store";

const CardItem = ({ card, authorizedRole }) => {
  const [, setModal] = useAtom(modalAtom);

  const [cardChecked, setCardChecked] = useState(false);

  const toggleCardSection = () => {
    setCardChecked(cardChecked === false ? true : false);
  };

  const toggleOnModal = (e) => {
    setModal(
      (m) =>
        (m = {
          ...m,
          toggleOn: true,
          modalId: card.id,
          target: e.target.id,
          editFileText: card.pictureUrl != null ? "Change" : "Add Image",
        })
    );
  };

  return (
    <>
      <Styled.SubHeader>
        <Styled.SubMenu>
          <Styled.PopupFooterButton
            type="checkbox"
            title={cardChecked ? "Collapse" : "Expand"}
            checked={cardChecked}
            onClick={toggleCardSection}
          >
            <Styled.CloseSpan cardChecked={cardChecked} />
          </Styled.PopupFooterButton>
          <Styled.SubTitle>{card.front}</Styled.SubTitle>
        </Styled.SubMenu>
      </Styled.SubHeader>
      {cardChecked ? (
        <Styled.Container>
          <Styled.CardField>
            Card Front: <Styled.Span>{card.front}</Styled.Span>
          </Styled.CardField>
          <Styled.CardField>
            Card Back: <Styled.Span>{card.back}</Styled.Span>
          </Styled.CardField>
          {card.pictureUrl != null ? (
            <Styled.CardField>
              Image:{" "}
              <a
                href={card.pictureUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Styled.CardInfo>{card.pictureUrl}</Styled.CardInfo>
              </a>
            </Styled.CardField>
          ) : null}
          <Styled.Created>
            Created on:{" "}
            <Moment format="YYYY-MM-DD HH:mm">{card.createdAt}</Moment>
          </Styled.Created>
          {authorizedRole && (
            <Styled.EditButton
              id="cardedit"
              type="button"
              onClick={toggleOnModal}
            >
              Edit
            </Styled.EditButton>
          )}
          {authorizedRole && <CardDelete card={card} />}
        </Styled.Container>
      ) : null}
    </>
  );
};

CardItem.propTypes = {
  card: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

export default withSession(CardItem);
