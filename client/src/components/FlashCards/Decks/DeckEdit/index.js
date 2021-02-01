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
  isSubmittingAtom,
  modalAtom,
  successAlertAtom,
} from "../../../../state/store";
import Modal from "../../../Modal";

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

  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, modalId, target, editImg, editFileText } = modal;

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);

  const [state, setState] = useState({
    id: null,
    deckName: "",
    description: "",
    deckImageName: "",
    deckImageUrl: "",
  });
  const { id, deckName, description, deckImageUrl, deckImageName } = state;

  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [updateDeck, { loading, error }] = useMutation(UPDATE_DECK, {
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
    },
  });

  useEffect(() => {
    if (toggleOn && modalId) {
      const currentDeck = client.readFragment({
        id: modalId,
        fragment: gql`
          fragment deck on Deck {
            id
            deckName
            description
            deckImageName
            deckImageUrl
            createdAt
          }
        `,
      });
      setState(currentDeck);
    }
  }, [client, toggleOn, modalId]);

  const [image, setImage] = useState("");
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
    if (editImg && deckImageUrl === null) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Add Image" })
      );
      setDrop(null);
    } else if (!editImg && deckImageUrl === null) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "No Image" })
      );
    } else if (!editImg && deckImageUrl) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Keep Image" })
      );
    } else if (editImg && deckImageUrl) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Change" })
      );
    }
  }, [editImg, deckImageUrl, setModal]);

  const isInvalid = deckName === "";

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

  const onSubmit = async (e, updateDeck) => {
    e.preventDefault();
    if (drop) {
      try {
        setIsSubmitting((a) => (a = true));
        try {
          new File([image], drop.name);
        } catch (err) {
          new Blob([image], drop.name);
        }
        const response = await s3SignMutation({
          variables: {
            filename: formatFilename(drop.name),
            filetype: drop.type,
          },
        });

        const { signedRequest, url } = response.data.signS3;

        await uploadToS3(image, signedRequest);

        await updateDeck({
          variables: {
            id: id,
            deckName,
            description,
            deckImageName: drop.name,
            deckImageUrl: url,
          },
        });
        setIsSubmitting((a) => (a = false));
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    } else if (deckImageUrl === "") {
      await updateDeck({
        variables: {
          id: id,
          deckName: deckName,
          description: description,
          deckImageUrl: null,
          deckImageName: null,
        },
      });
    } else {
      try {
        await updateDeck({
          variables: {
            id: id,
            deckName: deckName,
            description: description,
            deckImageUrl: deckImageUrl,
            deckImageName: deckImageName,
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
    setSuccessAlert((a) => (a = false));
  };

  const onDelete = (e) => {
    setState({
      id: id,
      deckName: deckName,
      description: description,
      deckImageUrl: null,
      deckImageName: "",
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
      {toggleOn && target === "deckedit" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>Edit Deck ...</Styled.PopupTitle>
            <Styled.PopupFooterButton title="Close" onClick={toggleOffModal}>
              <Styled.CloseSpan />
            </Styled.PopupFooterButton>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <form onSubmit={(e) => onSubmit(e, updateDeck)}>
              <Styled.Label>
                <Styled.Span>
                  <Styled.LabelName>Deck Name</Styled.LabelName>
                </Styled.Span>
                <Styled.Input
                  name="deckName"
                  value={deckName}
                  onChange={onChange}
                  type="text"
                />
              </Styled.Label>
              <Styled.Label>
                <Styled.Span>
                  <Styled.LabelName>Description</Styled.LabelName>
                </Styled.Span>
                <Styled.InputTextArea
                  name="description"
                  value={description}
                  onChange={onChange}
                  type="text"
                />
              </Styled.Label>
              {deckImageUrl !== null ? (
                <div>
                  <Styled.CardImg src={deckImageUrl} alt={deckImageUrl} />
                </div>
              ) : null}
              {!drop ? (
                <Styled.AddButton type="button" onClick={handleClick}>
                  {editFileText}
                </Styled.AddButton>
              ) : null}
              {deckImageUrl !== null && (
                <Styled.DeleteButton
                  deckImageUrl={deckImageUrl}
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
                  Remove File
                </Styled.DeleteButton>
              )}
              {editImg && (
                <DropZone
                  setDrop={setDrop}
                  setImage={setImage}
                  isDeck={"isDeck"}
                />
              )}
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
              {successAlert && <SuccessMessage message="Deck Updated!" />}
              {(error || s3Error) && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

export default DeckEdit;
