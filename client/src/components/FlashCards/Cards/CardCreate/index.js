import React, { Fragment, useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";

import * as Styled from "../../../../theme/Popup";
import Button from "../../../../theme/Button";

import DropZone from "../../../Uploader";
import Loading from "../../../Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";

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

//Component
const CardCreate = ({ deck, setIsOn, isCard }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [s3SignMutation, { loading: s3Loading, error: s3Error }] = useMutation(
    S3SIGNMUTATION
  );
  const [createCard, { loading, error }] = useMutation(CREATE_CARD, {
    onError: err => {
      setIsSuccess(false);
    },
    onCompleted: data => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  });

  const [drop, setDrop] = useState(null);
  const [state, setState] = useState({
    deckId: null,
    front: "",
    back: "",
    pictureName: "",
    pictureUrl: ""
  });
  const { front, back } = state;

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
        refetchQueries: ["getDecks"]
      });
      await setState({
        front: "",
        back: "",
        pictureName: "",
        pictureUrl: ""
      });
    } else {
      try {
        setState({
          front: "",
          back: "",
          pictureName: "",
          pictureUrl: ""
        });
        await createCard({
          variables: {
            deckId: parseInt(deck.id, 10),
            front: front,
            back: back
          }
        });
      } catch (error) {}
    }
  };

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

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

  const togglePopup = () => {
    setIsOn(false);
  };
  console.log(isCard);
  return (
    <Fragment>
      <Styled.PopupTitle>Create a card for your deck...</Styled.PopupTitle>
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
          <DropZone
            setDrop={setDrop}
            handleChange={handleChange}
            isCard={isCard}
          />
          <Button type="submit">Submit</Button>
          {(loading || s3Loading) && <Loading />}
          {isSuccess && <SuccessMessage message="Card Created!" />}
          {(error || s3Error) && <ErrorMessage error={error} />}
        </form>
      </Styled.PopupBody>
      <Styled.PopupFooterButton onClick={togglePopup}>
        Close
      </Styled.PopupFooterButton>
    </Fragment>
  );
};

export default CardCreate;
