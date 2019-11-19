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

//Mutations
const UPDATE_DECK = gql`
  mutation(
    $id: ID!
    $deckName: String!
    $description: String!
    $deckImageName: String
    $deckImageUrl: String
  ) {
    updateDeck(
      id: $id
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

const DeckEdit = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleEditDeck @client
      isDeck @client
      current @client
      editImg @client
      isSubmitting @client
    }
  `);
  const {
    toggleSuccess,
    toggleEditDeck,
    isDeck,
    isSubmitting,
    current,
    editImg
  } = data;

  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [updateDeck, { loading, error }] = useMutation(UPDATE_DECK, {
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    }
  });

  useEffect(() => {
    if (toggleEditDeck) {
      client.writeData({
        data: { isDeck: !isDeck }
      });
      const currentDeck = client.readFragment({
        id: current,
        fragment: gql`
          fragment deck on Deck {
            id
            deckName
            description
            deckImageName
            deckImageUrl
            createdAt
          }
        `
      });
      console.log(currentDeck);
      setState(currentDeck);
    }
  }, [client, current, toggleEditDeck]);

  const [state, setState] = useState({
    id: null,
    deckName: "",
    description: "",
    deckImageName: "",
    deckImageUrl: ""
  });
  const { id, deckName, description, deckImageUrl, deckImageName } = state;

  const [image, setImage] = useState("");
  const [drop, setDrop] = useState(null);

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleClick = () => {
    client.writeData({ data: { editImg: !editImg } });
  };

  const handleDrop = e => {
    setDrop(e.target.value);
  };

  const isInvalid = deckName === "";

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

  const onSubmit = async (e, updateDeck) => {
    e.preventDefault();
    console.log(drop);
    if (drop) {
      try {
        client.writeData({ data: { isSubmitting: true } });
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

        await updateDeck({
          variables: {
            id: id,
            deckName,
            description,
            deckImageName: drop.name,
            deckImageUrl: url
          }
        });
        client.writeData({ data: { isSubmitting: false } });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    } else if (deckImageUrl === "") {
      await updateDeck({
        variables: {
          id: id,
          deckName: deckName,
          description: description,
          deckImageUrl: null,
          deckImageName: null
        }
      });
    } else {
      try {
        await updateDeck({
          variables: {
            id: id,
            deckName: deckName,
            description: description,
            deckImageUrl: deckImageUrl,
            deckImageName: deckImageName
          }
        });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    }
  };

  const togglePopupModal = () => {
    client.writeData({
      data: {
        toggleEditDeck: !toggleEditDeck,
        editImg: false,
        isDeck: !isDeck
      }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Container>
      {toggleEditDeck ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupTitle>Edit Deck ...</Styled.PopupTitle>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, updateDeck)}>
                <Styled.InputTextArea
                  name="deckName"
                  value={deckName}
                  onChange={onChange}
                  type="text"
                  placeholder="Deck Name*"
                />
                <Styled.InputTextArea
                  name="description"
                  value={description}
                  onChange={onChange}
                  type="text"
                  placeholder="Add details and description*"
                />
                {deckImageUrl !== null ? (
                  <Styled.CardImg src={deckImageUrl} alt={deckImageUrl} />
                ) : null}
                <button type="button" onClick={handleClick}>
                  {!editImg && deckImageUrl === null
                    ? "Add Image"
                    : !editImg
                    ? "Change"
                    : "Keep Original"}
                </button>
                {deckImageUrl !== null && (
                  <button
                    type="button"
                    onClick={() =>
                      setState({
                        id: id,
                        deckName: deckName,
                        description: description,
                        deckImageUrl: "",
                        deckImageName: ""
                      })
                    }
                  >
                    Delete Image
                  </button>
                )}
                {editImg && (
                  <DropZone
                    setDrop={setDrop}
                    setImage={setImage}
                    handleDrop={handleDrop}
                    isDeck={isDeck}
                  />
                )}
                {!isSubmitting ? (
                  <Button disabled={isInvalid} type="submit">
                    Submit
                  </Button>
                ) : (
                  <Loading />
                )}
                {loading && <Loading />}
                {toggleSuccess && <SuccessMessage message="Deck Updated!" />}
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

export default DeckEdit;
