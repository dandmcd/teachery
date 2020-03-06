import React, { useState, useRef, useEffect, Fragment } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";

import useOuterClickNotifier from "../../../Alerts/OuterClickNotifier";
import * as Styled from "../../../../theme/Popup";
import DropZone from "../../../Uploader";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import CARDS_QUERY from "../CardList/CardListSchema/CardListSchema";

//Mutations
const CREATE_CARD = gql`
  mutation(
    $deckId: Int!
    $front: String!
    $back: String
    $pictureName: String
    $pictureUrl: String
  ) {
    createCard(
      deckId: $deckId
      front: $front
      back: $back
      pictureName: $pictureName
      pictureUrl: $pictureUrl
    ) {
      id
      front
      back
      createdAt
      pictureName
      pictureUrl
    }
  }
`;

const S3SIGNMUTATION = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;

const INITIAL_STATE = {
  deckId: null,
  front: "",
  back: "",
  pictureName: "",
  pictureUrl: ""
};

const CardCreate = ({ deck }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleAddCard @client
      isSubmitting @client
      current @client
    }
  `);
  const { toggleSuccess, toggleAddCard, isSubmitting, current } = data;

  const [{ deckId, front, back }, setState] = useState(INITIAL_STATE);
  const [drop, setDrop] = useState(null);

  // Mutation Hooks
  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [createCard, { loading, error }] = useMutation(CREATE_CARD, {
    update(cache, { data: { createCard } }) {
      const localData = cloneDeep(
        cache.readQuery({
          query: CARDS_QUERY,
          variables: { id: current }
        })
      );

      localData.deck.cards = [...localData.deck.cards, createCard];
      //      localData.deck.cards = [...localData.deck.cards, createCard];

      cache.writeQuery({
        query: CARDS_QUERY,
        variables: { id: localData.deck.id },
        data: { ...localData }
      });
    },
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    }
  });

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  // S3 Sign and format
  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options);
  };
  const formatFilename = filename => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const isInvalid = front === "";

  // Mutation Submit
  const onSubmit = async (e, createCard) => {
    e.preventDefault();
    if (drop) {
      try {
        client.writeData({ data: { isSubmitting: true } });
        const response = await s3SignMutation({
          variables: {
            filename: formatFilename(drop.name),
            filetype: drop.type
          }
        });

        const { signedRequest, url } = response.data.signS3;

        await uploadToS3(drop, signedRequest);

        await createCard({
          variables: {
            deckId: parseInt(current, 10),
            front,
            back,
            pictureName: drop.name,
            pictureUrl: url
          }
          //,
          // refetchQueries: [
          //   {
          //     query: CARDS_QUERY,
          //     variables: {
          //       id: deck.id
          //     }
          //   }
          // ]
        }).then(async ({ data }) => {
          setState({
            deckId: deckId,
            front: "",
            back: "",
            pictureName: "",
            pictureUrl: ""
          });
        });
        client.writeData({ data: { isSubmitting: false } });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    } else {
      try {
        await createCard({
          variables: {
            deckId: parseInt(current, 10),
            front: front,
            back: back
          }
          // ,
          // refetchQueries: [
          //   {
          //     query: CARDS_QUERY,
          //     variables: {
          //       id: deck.id
          //     }
          //   }
          // ]
        }).then(async ({ data }) => {
          setState({
            deckId: deckId,
            front: "",
            back: "",
            pictureName: "",
            pictureUrl: ""
          });
        });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    }
  };

  const handleChange = e => {
    setDrop(e.target.value);
  };

  useEffect(() => {
    if (toggleAddCard && current) {
      setState({
        deckId: parseInt(current, 10),
        front: "",
        back: "",
        pictureName: "",
        pictureUrl: ""
      });
    }
  }, [toggleAddCard, current]);

  const togglePopupModal = () => {
    client.writeData({
      data: { toggleAddCard: !toggleAddCard }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Fragment>
      {toggleAddCard ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupHeader>
              <Styled.PopupTitle>
                Create a Card for Your Deck ...
              </Styled.PopupTitle>
              <Styled.PopupFooterButton
                title="Close"
                onClick={togglePopupModal}
              >
                <Styled.CloseSpan />
              </Styled.PopupFooterButton>
            </Styled.PopupHeader>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, createCard)}>
                <Styled.Label>
                  <Styled.Span>
                    <Styled.LabelName>Front of the Flashcard</Styled.LabelName>
                  </Styled.Span>
                  <Styled.InputTextArea
                    name="front"
                    value={front}
                    onChange={onChange}
                    type="text"
                  />
                </Styled.Label>
                <Styled.Label>
                  <Styled.Span>
                    <Styled.LabelName>Back of the Flashcard</Styled.LabelName>
                  </Styled.Span>
                  <Styled.InputTextArea
                    name="back"
                    value={back}
                    onChange={onChange}
                    type="text"
                  />
                </Styled.Label>
                <DropZone
                  setDrop={setDrop}
                  handleChange={handleChange}
                  isCard={"isCard"}
                />
                {loading && <Loading />}
                <Styled.Submission>
                  {!isSubmitting ? (
                    <Styled.SubmitButton disabled={isInvalid} type="submit">
                      Submit
                    </Styled.SubmitButton>
                  ) : (
                    <Loading />
                  )}
                </Styled.Submission>
                {toggleSuccess && <SuccessMessage message="Card Created!" />}
                {(error || s3Error) && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Fragment>
  );
};

CardCreate.propTyoes = {
  deck: PropTypes.object
};

export default CardCreate;
