import React, { useState, useRef, useEffect, Fragment } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";

import * as Styled from "../../../../theme/Popup";
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
      isSubmitting @client
    }
  `);
  const { toggleSuccess, togglePopup, isSubmitting } = data;

  const [{ deckName, description }, setDeckState] = useState(INITIAL_STATE);

  const [image, setImage] = useState("");
  const [drop, setDrop] = useState(null);

  // Mutation hooks
  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);

  const [createDeck, { loading, error }] = useMutation(CREATE_DECK, {
    onError: err => {
      client.writeData({ data: { toggleSuccess: false } });
    },
    onCompleted: data => {
      client.writeData({ data: { toggleSuccess: true } });
    },
    update(cache, { data: { createDeck } }) {
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
        client.writeData({ data: { isSubmitting: false } });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
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
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    }
  };

  const handleChange = e => {
    setDrop(e.target.value);
  };

  // Onclick toggle popup for mutation form
  const togglePopupModal = () => {
    client.writeData({
      data: { togglePopup: !togglePopup }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Fragment>
      <Styled.CreateButton type="button" onClick={togglePopupModal}>
        Create A New Deck
      </Styled.CreateButton>
      {togglePopup ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupHeader>
              <Styled.PopupTitle>Create a Deck ...</Styled.PopupTitle>
              <Styled.PopupFooterButton onClick={togglePopupModal}>
                <Styled.CloseSpan />
              </Styled.PopupFooterButton>
            </Styled.PopupHeader>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, createDeck)}>
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
                {toggleSuccess && <SuccessMessage message="Deck created!" />}
                {(error || s3Error) && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Fragment>
  );
};

export default DeckCreate;
