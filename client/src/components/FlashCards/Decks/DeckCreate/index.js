import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import * as Styled from "../../../../theme/Popup";
import Button from "../../../../theme/Button";
import useOuterClickNotifier from "../../../Alerts";

import DropZone from "../../../Uploader";
import ErrorMessage from "../../../Alerts/Error";
import SuccessMessage from "../../../Alerts/Success";
import GET_PAGINATED_DECKS_WITH_USERS from "../DeckSchema";
import Loading from "../../../Loading";

const CREATE_DECK = gql`
  mutation(
    $deckName: String!
    $description: String!
    $deckImageName: String
    $deckImageUrl: String
  ) {
    createDeck(
      deckName: $deckName
      description: $description
      deckImageName: $deckImageName
      deckImageUrl: $deckImageUrl
    ) {
      id
      deckName
      description
      deckImageName
      deckImageUrl
      createdAt
      user {
        id
        username
      }
      cards {
        id
        front
        back
      }
      tags {
        id
        tagName
      }
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
  deckName: "",
  description: "",
  deckImageName: "",
  deckImageUrl: ""
};

const DeckCreate = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      togglePopup @client
      isDeck @client
    }
  `);
  const { toggleSuccess, togglePopup, isDeck } = data;

  const [{ deckName, description }, setDeckState] = useState(INITIAL_STATE);

  const [image, setImage] = useState("");
  const [drop, setDrop] = useState(null);

  // Mutation hooks
  const [s3SignMutation, { loading: s3Loading, error: s3Error }] = useMutation(
    S3SIGNMUTATION
  );

  const [createDeck, { loading, error }] = useMutation(CREATE_DECK, {
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    },
    update(
      cache,
      {
        data: { createDeck }
      }
    ) {
      const data = cache.readQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS
      });

      cache.writeQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS,
        data: {
          ...data,
          decks: {
            ...data.decks,
            edges: [createDeck, ...data.decks.edges],
            pageInfo: data.decks.pageInfo
          }
        }
      });
    }
  });

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  //S3 Sign and format
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
    setDeckState(prevState => ({ ...prevState, [name]: value }));
  };

  const isInvalid = deckName === "" || description === "";

  const onSubmit = async (e, createDeck) => {
    e.preventDefault();
    if (drop) {
      console.log(drop);
      console.log(new File([image], drop.name));
      const response = await s3SignMutation({
        variables: {
          filename: formatFilename(drop.name),
          filetype: drop.type
        }
      });

      const { signedRequest, url } = response.data.signS3;

      await uploadToS3(image, signedRequest);

      await createDeck({
        variables: {
          deckName,
          description,
          deckImageName: drop.name,
          deckImageUrl: url
        }
      }).then(async ({ data }) => {
        setDeckState({ ...INITIAL_STATE });
      });
    } else {
      try {
        await createDeck({
          variables: {
            deckName: deckName,
            description: description
          }
        }).then(async ({ data }) => {
          setDeckState({ ...INITIAL_STATE });
        });
      } catch (error) {}
    }
  };

  const handleChange = e => {
    setDrop(e.target.value);
  };

  // Onclick toggle popup for mutation form
  const togglePopupModal = () => {
    client.writeData({
      data: { togglePopup: !togglePopup, isDeck: !isDeck }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Container>
      <Button type="button" onClick={togglePopupModal}>
        Create Deck
      </Button>
      {togglePopup ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupTitle>
              Create a name and description for your deck...
            </Styled.PopupTitle>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, createDeck)}>
                <Styled.Input
                  name="deckName"
                  value={deckName}
                  onChange={onChange}
                  type="text"
                  placeholder="Enter a deck name*"
                />
                <Styled.InputTextArea
                  name="description"
                  value={description}
                  onChange={onChange}
                  type="text"
                  placeholder="Add details and descriptions*"
                />
                <DropZone
                  setDrop={setDrop}
                  setImage={setImage}
                  handleChange={handleChange}
                  isDeck={isDeck}
                />
                <Button disabled={isInvalid || loading} type="submit">
                  Submit
                </Button>
                {(loading || s3Loading) && <Loading />}
                {toggleSuccess && <SuccessMessage message="Deck created!" />}
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

export default DeckCreate;
