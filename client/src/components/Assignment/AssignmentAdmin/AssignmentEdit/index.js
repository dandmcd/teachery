import React, { useState, useRef, useEffect, Fragment } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";

import useOuterClickNotifier from "../../../Alerts";
import * as Styled from "../../../../theme/Popup";
import DropZone from "../../../Uploader";
import Loading from "../../../Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import withSession from "../../../Session/withSession";

const UPDATE_ASSIGNMENT = gql`
  mutation(
    $id: ID!
    $assignmentName: String!
    $note: String
    $link: String
    $documentName: String
    $documentUrl: String
  ) {
    updateAssignment(
      id: $id
      assignmentName: $assignmentName
      note: $note
      link: $link
      documentName: $documentName
      documentUrl: $documentUrl
    ) {
      id
      assignmentName
      note
      link
      documentName
      documentUrl
      createdAt
      user {
        id
        username
      }
      assignedTasks {
        id
        assignmentId
        status
        dueDate
        createdAt
        assignedTo
        assignedToName
        updatedDocumentName
        updatedDocumentUrl
        user {
          id
          username
        }
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

const AssignmentEdit = ({ session }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleAssignmentEdit @client
      current @client
      isSubmitting @client
      editImg @client
    }
  `);
  const {
    toggleSuccess,
    toggleAssignmentEdit,
    current,
    isSubmitting,
    editImg
  } = data;

  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [updateAssignment, { loading, error }] = useMutation(
    UPDATE_ASSIGNMENT,
    {
      onError: err => {
        client.writeData({ data: { toggleSuccess: false } });
      },
      onCompleted: data => {
        client.writeData({ data: { toggleSuccess: true } });
      }
    }
  );

  useEffect(() => {
    if (toggleAssignmentEdit) {
      const currentAssignment = client.readFragment({
        id: current,
        fragment: gql`
          fragment assignment on Assignment {
            id
            assignmentName
            note
            link
            documentName
            documentUrl
            createdAt
          }
        `
      });
      console.log(currentAssignment);

      setState(currentAssignment);
    }
  }, [client, current, toggleAssignmentEdit]);

  const [state, setState] = useState({
    id: null,
    assignmentName: "",
    note: "",
    link: "",
    documentName: "",
    documentUrl: ""
  });
  const { id, assignmentName, note, link, documentName, documentUrl } = state;

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
    const newFilename = `docs/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  const isInvalid = assignmentName === "";

  const onSubmit = async (e, updateAssignment) => {
    e.preventDefault();
    console.log(drop);
    if (drop) {
      try {
        client.writeData({ data: { isSubmitting: true } });
        const response = await s3SignMutation({
          variables: {
            filename: formatFilename(drop.name),
            filetype: drop.type
          }
        });

        const { signedRequest, url } = response.data.signS3;

        await uploadToS3(drop, signedRequest);
        console.log("It's a drop");
        await updateAssignment({
          variables: {
            id: id,
            assignmentName,
            note,
            link,
            documentName: drop.name,
            documentUrl: url
          }
        }).then(async ({ data }) => {
          setState({
            id: id,
            assignmentName: assignmentName,
            note: note,
            link: link,
            documentName: "",
            documentUrl: ""
          });
        });
        client.writeData({ data: { isSubmitting: false } });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    } else if (documentUrl === "") {
      console.log("It's an else if");
      await updateAssignment({
        variables: {
          id: id,
          assignmentName: assignmentName,
          note: note,
          link: link,
          documentName: null,
          documentUrl: null
        }
      });
    } else {
      try {
        console.log("It's else");
        await updateAssignment({
          variables: {
            id: id,
            assignmentName: assignmentName,
            note: note,
            link: link,
            documentName: documentName,
            documentUrl: documentUrl
          }
        }).then(async ({ data }) => {
          setState({
            id: id,
            assignmentName: assignmentName,
            note: note,
            link: link,
            documentName: "",
            documentUrl: ""
          });
        });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    }
  };

  const togglePopupModal = () => {
    client.writeData({
      data: {
        toggleAssignmentEdit: !toggleAssignmentEdit,
        editImg: false
      }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Fragment>
      {toggleAssignmentEdit ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupHeader>
              <Styled.PopupTitle>Edit Assignment ...</Styled.PopupTitle>
              <Styled.PopupFooterButton onClick={togglePopupModal}>
                <Styled.CloseSpan />
              </Styled.PopupFooterButton>
            </Styled.PopupHeader>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, updateAssignment)}>
                <Styled.Label>
                  <Styled.Span>
                    <Styled.LabelName>Assignment Name</Styled.LabelName>
                  </Styled.Span>
                  <Styled.Input
                    name="assignmentName"
                    value={assignmentName}
                    onChange={onChange}
                    type="text"
                  />
                </Styled.Label>
                <Styled.Label>
                  <Styled.Span>
                    <Styled.LabelName>Add a Note or Details</Styled.LabelName>
                  </Styled.Span>
                  <Styled.InputTextArea
                    name="note"
                    value={note}
                    onChange={onChange}
                    type="text"
                  />
                </Styled.Label>
                <Styled.Label>
                  <Styled.Span>
                    <Styled.LabelName>Add an URL Link</Styled.LabelName>
                  </Styled.Span>
                  <Styled.Input
                    name="link"
                    value={link || ""}
                    onChange={onChange}
                    type="text"
                  />
                </Styled.Label>
                {documentUrl !== null ? (
                  <div>
                    <Styled.CardImg src={documentUrl} alt={documentUrl} />
                  </div>
                ) : null}
                <Styled.AddButton type="button" onClick={handleClick}>
                  {!editImg && documentUrl === null
                    ? "Add File"
                    : !editImg
                    ? "Change"
                    : "Keep Original"}
                </Styled.AddButton>
                {documentUrl !== null && (
                  <Styled.DeleteButton
                    documentUrl={documentUrl}
                    type="button"
                    onClick={() =>
                      setState({
                        id: id,
                        assignmentName: assignmentName,
                        note: note,
                        link: link,
                        documentName: "",
                        documentUrl: ""
                      })
                    }
                  >
                    Remove File
                  </Styled.DeleteButton>
                )}
                {editImg && (
                  <DropZone setDrop={setDrop} isDocument={"isDocument"} />
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
                {toggleSuccess && (
                  <SuccessMessage message="Assignment Updated!" />
                )}
                {(error || s3Error) && <ErrorMessage error={error} />}
              </form>
            </Styled.PopupBody>
          </Styled.PopupInnerExtended>
        </Styled.PopupContainer>
      ) : null}
    </Fragment>
  );
};

export default withSession(AssignmentEdit);
