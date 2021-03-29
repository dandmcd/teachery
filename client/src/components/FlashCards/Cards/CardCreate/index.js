import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { useAtom } from "jotai";

import * as Styled from "../../../../theme/Popup";
import DropZone from "../../../Uploader";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import CARDS_QUERY from "../CardList/CardListSchema/CardListSchema";
import {
  isSubmittingAtom,
  modalAtom,
  successAlertAtom,
} from "../../../../state/store";
import Modal from "../../../Modal";
import { S3SIGNMUTATION, CREATE_CARD } from "./schema";

const INITIAL_STATE = {
  deckId: null,
  front: "",
  back: "",
  pictureName: "",
  pictureUrl: "",
};

const CardCreate = ({ deck }) => {
  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, modalId, target } = modal;

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);

  const [{ deckId, front, back }, setState] = useState(INITIAL_STATE);
  const [drop, setDrop] = useState(null);

  // Mutation Hooks
  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [createCard, { loading, error }] = useMutation(CREATE_CARD, {
    optimisticResponse: {
      __typename: "Mutation",
      createCard: {
        id: modalId,
        __typename: "",
        front: front,
        back: back,
        createdAt: new Date(),
        pictureName: "",
        pictureUrl: "",
      },
    },
    update(cache, { data: { createCard } }) {
      const localData = cloneDeep(
        cache.readQuery({
          query: CARDS_QUERY,
          variables: { id: modalId },
        })
      );

      localData.deck.cards = [...localData.deck.cards, createCard];

      cache.writeQuery({
        query: CARDS_QUERY,
        variables: { id: localData.deck.id },
        data: { ...localData },
      });
    },
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
    },
  });

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert((a) => (a = false));
      }, 5000);
    }
  }, [successAlert, setSuccessAlert]);

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isInvalid = front === "" || back.length > 255;

  // Mutation Submit
  const onSubmit = async (e, createCard) => {
    e.preventDefault();
    if (drop) {
      try {
        setIsSubmitting((a) => (a = true));
        const response = await s3SignMutation({
          variables: {
            filename: formatFilename(drop.name),
            filetype: drop.type,
          },
        });

        const { signedRequest, url } = response.data.signS3;

        await uploadToS3(drop, signedRequest);

        await createCard({
          variables: {
            deckId: parseInt(modalId, 10),
            front,
            back,
            pictureName: drop.name,
            pictureUrl: url,
          },
        }).then(async ({ data }) => {
          setState({
            deckId: deckId,
            front: "",
            back: "",
            pictureName: "",
            pictureUrl: "",
          });
        });
        setIsSubmitting((a) => (a = false));
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    } else {
      try {
        await createCard({
          variables: {
            deckId: parseInt(modalId, 10),
            front: front,
            back: back,
          },
        }).then(async ({ data }) => {
          setState({
            deckId: deckId,
            front: "",
            back: "",
            pictureName: "",
            pictureUrl: "",
          });
        });
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    }
  };

  const handleChange = (e) => {
    setDrop(e.target.value);
  };

  useEffect(() => {
    if (toggleOn && modalId) {
      setState({
        deckId: parseInt(modalId, 10),
        front: "",
        back: "",
        pictureName: "",
        pictureUrl: "",
      });
    }
  }, [toggleOn, modalId]);

  const toggleOffModal = () => {
    setModal((m) => (m = { ...m, toggleOn: false, editImg: false }));
    setSuccessAlert((a) => (a = false));
  };

  return (
    <>
      {toggleOn && target === "addcard" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>
              Create a Card for Your Deck ...
            </Styled.PopupTitle>
            <Styled.PopupFooterButton title="Close" onClick={toggleOffModal}>
              <Styled.CloseSpan />
            </Styled.PopupFooterButton>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <form onSubmit={(e) => onSubmit(e, createCard)}>
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
              {successAlert && <SuccessMessage message="Card Created!" />}
              {(error || s3Error) && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

CardCreate.propTyoes = {
  deck: PropTypes.object,
};

export default CardCreate;
