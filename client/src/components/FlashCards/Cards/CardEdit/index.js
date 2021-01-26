import React, { useState, useEffect, useCallback } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";

import * as Styled from "../../../../theme/Popup";
import DropZone from "../../../Uploader";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import { useAtom } from "jotai";
import {
  deckIdAtom,
  isSubmittingAtom,
  modalAtom,
  successAlertAtom,
} from "../../../../state/store";
import Modal from "../../../Modal";

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

  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, modalId, target, editImg, editFileText } = modal;
  const [deckId] = useAtom(deckIdAtom);

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);

  const [state, setState] = useState({
    id: null,
    front: "",
    back: "",
    pictureName: "",
    pictureUrl: "",
  });
  const { id, front, back, pictureUrl, pictureName } = state;

  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [updateCard, { loading, error }] = useMutation(UPDATE_CARD, {
    optimisticResponse: {
      __typename: "Mutation",
      updateCard: {
        id: id,
        __typename: "",
        front: front,
        back: back,
        pictureName: pictureName,
        pictureUrl: pictureUrl,
      },
    },

    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
    },
  });

  useEffect(() => {
    if (toggleOn && modalId) {
      const currentCard = client.readFragment({
        id: modalId,
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
  }, [client, toggleOn, modalId]);

  const [drop, setDrop] = useState(null);

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert((a) => (a = false));
      }, 5000);
    }
  }, [successAlert, setSuccessAlert]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = useCallback(() => {
    if (editImg && pictureUrl === null) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Add Image" })
      );
      setDrop(null);
    } else if (!editImg && pictureUrl === null) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "No Image" })
      );
    } else if (!editImg && pictureUrl) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Keep Image" })
      );
    } else if (editImg && pictureUrl) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Change" })
      );
    }
  }, [editImg, pictureUrl, setModal]);

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
            deckId: deckId,
            front,
            back,
            pictureName: drop.name,
            pictureUrl: url,
          },
        });
        setIsSubmitting((a) => (a = false));
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    } else if (pictureUrl === "") {
      await updateCard({
        variables: {
          id: id,
          deckId: deckId,
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
            deckId: deckId,
            front: front,
            back: back,
            pictureUrl: pictureUrl,
            pictureName: pictureName,
          },
        });
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    }
  };

  const toggleOffModal = () => {
    setModal(
      (m) =>
        (m = {
          ...m,
          toggleOn: false,
          editImg: false,
        })
    );
    setDrop(null);
  };

  const onDelete = (e) => {
    setState({
      id: id,
      front: front,
      back: back,
      pictureUrl: null,
      pictureName: "",
    });
    setModal(
      (m) =>
        (m = {
          ...m,
          editFileText: "Add Image",
        })
    );
  };

  return (
    <>
      {toggleOn && target === "cardedit" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>Edit Card ...</Styled.PopupTitle>
            <Styled.PopupFooterButton title="Close" onClick={toggleOffModal}>
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
              {!drop ? (
                <Styled.AddButton type="button" onClick={handleClick}>
                  {editFileText}
                </Styled.AddButton>
              ) : null}
              {pictureUrl !== null && (
                <Styled.DeleteButton
                  pictureUrl={pictureUrl}
                  type="button"
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Are you sure you wish to remove this file?  Changes won't be saved until you Submit changes."
                      )
                    )
                      onDelete(e);
                  }}
                >
                  Delete Image
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
              {successAlert && <SuccessMessage message="Card Updated!" />}
              {(error || s3Error) && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

export default CardEdit;
