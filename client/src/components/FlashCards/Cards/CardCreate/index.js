import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";

import useOuterClickNotifier from "../../../Alerts";
import * as Styled from "../../../../theme/Popup";
import Button from "../../../../theme/Button";
import DropZone from "../../../Uploader";
import Loading from "../../../Loading";
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
      isCard @client
    }
  `);
  const { toggleSuccess, toggleAddCard, isCard } = data;

  const [{ front, back }, setState] = useState(INITIAL_STATE);
  const [drop, setDrop] = useState(null);

  // Mutation Hooks
  const [s3SignMutation, { loading: s3Loading, error: s3Error }] = useMutation(
    S3SIGNMUTATION
  );
  const [createCard, { loading, error }] = useMutation(CREATE_CARD, {
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

  // Mutation Submit
  const onSubmit = async (e, createCard) => {
    e.preventDefault();
    console.log(drop);
    if (drop) {
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
          deckId: parseInt(deck.id, 10),
          front,
          back,
          pictureName: drop.name,
          pictureUrl: url
        },
        refetchQueries: [
          {
            query: CARDS_QUERY,
            variables: {
              id: deck.id
            }
          }
        ]
      }).then(async ({ data }) => {
        setState({ ...INITIAL_STATE });
      });
    } else {
      try {
        await createCard({
          variables: {
            deckId: parseInt(deck.id, 10),
            front: front,
            back: back
          },
          refetchQueries: [
            {
              query: CARDS_QUERY,
              variables: {
                id: deck.id
              }
            }
          ]
        }).then(async ({ data }) => {
          setState({ ...INITIAL_STATE });
        });
      } catch (error) {}
    }
  };

  const handleChange = e => {
    setDrop(e.target.value);
  };

  useEffect(() => {
    if (deck && deck.id) {
      setState({
        deckId: parseInt(deck.id, 10),
        front: "",
        back: "",
        pictureName: "",
        pictureUrl: ""
      });
    }
  }, [deck, setState]);

  const togglePopupModal = () => {
    client.writeData({
      data: { toggleAddCard: !toggleAddCard, isCard: !isCard }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Container>
      <AddCardButton type="button" onClick={togglePopupModal}>
        Add Card
      </AddCardButton>
      {toggleAddCard ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupTitle>
              Create a card for your deck...
            </Styled.PopupTitle>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, createCard)}>
                <Styled.InputTextArea
                  name="front"
                  value={front}
                  onChange={onChange}
                  type="text"
                  placeholder="Front of the flashcard"
                />
                <Styled.InputTextArea
                  name="back"
                  value={back}
                  onChange={onChange}
                  type="text"
                  placeholder="Back of the card"
                />
                <DropZone setDrop={setDrop} handleChange={handleChange} />
                <Button type="submit">Submit</Button>
                {(loading || s3Loading) && <Loading />}
                {toggleSuccess && <SuccessMessage message="Card Created!" />}
                {(error || s3Error) && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
            <Styled.PopupFooterButton onClick={togglePopupModal}>
              Close
            </Styled.PopupFooterButton>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div``;

const AddCardButton = styled(Button)`
  border: 2px solid #0d5d5d;
`;

export default CardCreate;
