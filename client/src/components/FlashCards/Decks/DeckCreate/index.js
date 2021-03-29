import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import moment from "moment";

import * as Styled from "../../../../theme/Popup";
import DropZone from "../../../Uploader";
import ErrorMessage from "../../../Alerts/Error";
import SuccessMessage from "../../../Alerts/Success";
import GET_PAGINATED_DECKS_WITH_USERS from "../DeckSchema";
import Loading from "../../../Alerts/Loading";
import { useAtom } from "jotai";
import {
  isSubmittingAtom,
  modalAtom,
  successAlertAtom,
} from "../../../../state/store";
import Modal from "../../../Modal";
import { S3SIGNMUTATION, CREATE_DECK } from "./schema";

const INITIAL_STATE = {
  deckName: "",
  description: "",
  deckImageName: "",
  deckImageUrl: "",
};

const DeckCreate = () => {
  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, target } = modal;

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);

  const [{ deckName, description }, setDeckState] = useState(INITIAL_STATE);

  const [image, setImage] = useState("");
  const [drop, setDrop] = useState(null);

  // Mutation hooks
  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);

  const [createDeck, { loading, error }] = useMutation(CREATE_DECK, {
    onError: (err) => {
      setSuccessAlert((a) => (a = false));
    },
    onCompleted: (data) => {
      setSuccessAlert((a) => (a = true));
    },
    update(cache, { data: { createDeck } }) {
      const data = cache.readQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS,
      });

      cache.writeQuery({
        query: GET_PAGINATED_DECKS_WITH_USERS,
        data: {
          ...data,
          decks: {
            ...data.decks,
            edges: [createDeck, ...data.decks.edges],
            pageInfo: data.decks.pageInfo,
          },
        },
      });
    },
  });

  useEffect(() => {
    if (successAlert) {
      setTimeout(() => {
        setSuccessAlert((a) => (a = false));
      }, 5000);
    }
  }, [successAlert, setSuccessAlert]);

  //S3 Sign and format
  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios
      .put(signedRequest, file, options)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
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
    setDeckState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isInvalid = deckName === "" || description === "";

  const onSubmit = async (e, createDeck) => {
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

        await createDeck({
          variables: {
            deckName,
            description,
            deckImageName: drop.name,
            deckImageUrl: url,
          },
        }).then(async ({ data }) => {
          setDeckState({ ...INITIAL_STATE });
        });
        setIsSubmitting((a) => (a = false));
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    } else {
      try {
        await createDeck({
          variables: {
            deckName: deckName,
            description: description,
          },
        }).then(async ({ data }) => {
          setDeckState({ ...INITIAL_STATE });
        });
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    }
  };

  const handleChange = (e) => {
    setDrop(e.target.value);
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
    setSuccessAlert((a) => (a = false));
  };

  return (
    <>
      {toggleOn && target === "deckcreate" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>Create a Deck ...</Styled.PopupTitle>
            <Styled.PopupFooterButton onClick={toggleOffModal}>
              <Styled.CloseSpan />
            </Styled.PopupFooterButton>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <form onSubmit={(e) => onSubmit(e, createDeck)}>
              <Styled.Label>
                <Styled.Span>
                  <Styled.LabelName>Enter a Deck Name</Styled.LabelName>
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
                  <Styled.LabelName>
                    Add Details or a Description
                  </Styled.LabelName>
                </Styled.Span>
                <Styled.InputTextArea
                  name="description"
                  value={description}
                  onChange={onChange}
                  type="text"
                />
              </Styled.Label>
              <DropZone
                setDrop={setDrop}
                setImage={setImage}
                handleChange={handleChange}
                isDeck={"isDeck"}
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
              {successAlert && <SuccessMessage message="Deck created!" />}
              {(error || s3Error) && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

export default DeckCreate;
