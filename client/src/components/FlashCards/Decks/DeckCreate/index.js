import React, { useState, useRef } from "react";
import { Mutation, useMutation } from "react-apollo";
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

const Container = styled.div``;

const DeckCreate = () => {
  const [isDeck, setIsDeck] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [s3SignMutation, { loading: s3Loading, error: s3Error }] = useMutation(
    S3SIGNMUTATION
  );
  const [showPopup, setShowPopup] = useState(false);
  const [deckState, setDeckState] = useState({
    deckName: "",
    description: "",
    deckImageName: "",
    deckImageUrl: ""
  });
  console.log(deckState);
  const [image, setImage] = useState("");
  const [drop, setDrop] = useState(null);

  const { deckName, description } = deckState;

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
      });

      await setDeckState({
        deckName: "",
        description: "",
        deckImageName: "",
        deckImageUrl: ""
      });
    } else {
      try {
        setDeckState({
          deckName: "",
          description: "",
          deckImageName: "",
          deckImageUrl: ""
        });
        await createDeck({
          variables: {
            deckName: deckName,
            description: description
          }
        });
      } catch (error) {}
    }
  };

  const onChange = e =>
    setDeckState({ ...deckState, [e.target.name]: e.target.value });

  const handleChange = e => {
    setDrop(e.target.value);
  };

  const togglePopup = () => {
    setShowPopup(false);
  };

  const innerRef = useRef(null);
  useOuterClickNotifier(e => setShowPopup(false), innerRef);

  return (
    <Container>
      <Button
        type="button"
        onClick={() => {
          setIsDeck(true);
          setShowPopup(true);
        }}
      >
        Create Deck
      </Button>
      {showPopup ? (
        <Mutation
          mutation={CREATE_DECK}
          onError={data => setIsSuccess(false)}
          onCompleted={data => {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
            }, 5000);
          }}
          update={(cache, { data: { createDeck } }) => {
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
          }}
        >
          {(createDeck, { data, loading, error }) => (
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
                    <Button type="submit">Submit</Button>
                    {(loading || s3Loading) && <Loading />}
                    {isSuccess && <SuccessMessage message="Deck created!" />}
                    {(error || s3Error) && <ErrorMessage error={error} />}
                  </form>
                </Styled.PopupBody>
                <Styled.PopupFooterButton onClick={togglePopup}>
                  Close
                </Styled.PopupFooterButton>
              </Styled.PopupInnerExtended>
            </Styled.PopupContainer>
          )}
        </Mutation>
      ) : null}
    </Container>
  );
};

export default DeckCreate;
