import React, { useState, useRef, useEffect, Fragment } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";

import useOuterClickNotifier from "../../../Alerts/OuterClickNotifier";
import * as Styled from "../../../../theme/Popup";
import DropZone from "../../../Uploader";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";

//Mutations
const UPDATE_CARD = gql`
  mutation(
    $id: ID!
    $deckId: Int!
    $front: String!
    $back: String
    $pictureName: String
    $pictureUrl: String
  ) {
    updateCard(
      id: $id
      deckId: $deckId
      front: $front
      back: $back
      pictureName: $pictureName
      pictureUrl: $pictureUrl
    ) {
      id
      front
      back
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

const CardEdit = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleEditCard @client
      current @client
      currentDeckId @client
      editImg @client
      isSubmitting @client
    }
  `);
  const {
    toggleSuccess,
    toggleEditCard,
    isSubmitting,
    current,
    currentDeckId,
    editImg,
  } = data;

  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [updateCard, { loading, error }] = useMutation(UPDATE_CARD, {
    onError: (err) => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: (data) => {
      client.writeData({ data: { toggleSuccess: true } });
    },
  });

  useEffect(() => {
    if (toggleEditCard) {
      const currentCard = client.readFragment({
        id: current,
        fragment: gql`
          fragment card on Card {
            id
            front
            back
            pictureName
            pictureUrl
            createdAt
          }
        `,
      });

      setState(currentCard);
    }
  }, [client, current, toggleEditCard]);

  const [state, setState] = useState({
    id: null,
    front: "",
    back: "",
    pictureName: "",
    pictureUrl: "",
  });
  const { id, front, back, pictureUrl, pictureName } = state;
  const [drop, setDrop] = useState(null);

  console.log(currentDeckId);

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = () => {
    client.writeData({ data: { editImg: !editImg } });
  };

  const isInvalid = front === "";

  // S3 Sign and format
  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(signedRequest, file, options);
  };
  const formatFilename = (filename) => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  const onSubmit = async (e, updateCard) => {
    e.preventDefault();
    if (drop) {
      try {
        client.writeData({ data: { isSubmitting: true } });
        const response = await s3SignMutation({
          variables: {
            filename: formatFilename(drop.name),
            filetype: drop.type,
          },
        });

        const { signedRequest, url } = response.data.signS3;

        await uploadToS3(drop, signedRequest);

        await updateCard({
          variables: {
            id: id,
            deckId: currentDeckId,
            front,
            back,
            pictureName: drop.name,
            pictureUrl: url,
          },
        });
        client.writeData({ data: { isSubmitting: false } });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    } else if (pictureUrl === "") {
      await updateCard({
        variables: {
          id: id,
          deckId: currentDeckId,
          front: front,
          back: back,
          pictureUrl: null,
          pictureName: null,
        },
      });
    } else {
      try {
        await updateCard({
          variables: {
            id: id,
            deckId: currentDeckId,
            front: front,
            back: back,
            pictureUrl: pictureUrl,
            pictureName: pictureName,
          },
        });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    }
  };

  const togglePopupModal = () => {
    client.writeData({
      data: {
        toggleEditCard: !toggleEditCard,
        editImg: false,
      },
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Fragment>
      {toggleEditCard ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupHeader>
              <Styled.PopupTitle>Edit Card ...</Styled.PopupTitle>
              <Styled.PopupFooterButton
                title="Close"
                onClick={togglePopupModal}
              >
                <Styled.CloseSpan />
              </Styled.PopupFooterButton>
            </Styled.PopupHeader>
            <Styled.PopupBody>
              <form onSubmit={(e) => onSubmit(e, updateCard)}>
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
                {pictureUrl !== null ? (
                  <div>
                    <Styled.CardImg src={pictureUrl} alt={pictureUrl} />
                  </div>
                ) : null}
                <Styled.AddButton type="button" onClick={handleClick}>
                  {!editImg && pictureUrl === null
                    ? "Add File"
                    : !editImg
                    ? "Change"
                    : "Keep Original"}
                </Styled.AddButton>
                {pictureUrl !== null && (
                  <Styled.DeleteButton
                    pictureUrl={pictureUrl}
                    type="button"
                    onClick={() =>
                      setState({
                        id: id,
                        front: front,
                        back: back,
                        pictureUrl: "",
                        pictureName: "",
                      })
                    }
                  >
                    Remove File
                  </Styled.DeleteButton>
                )}
                {editImg && <DropZone setDrop={setDrop} isCard={"isCard"} />}
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
                {toggleSuccess && <SuccessMessage message="Card Updated!" />}
                {(error || s3Error) && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Fragment>
  );
};

export default CardEdit;
