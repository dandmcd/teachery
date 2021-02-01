import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";
import { useAtom } from "jotai";

import ErrorMessage from "../../../Alerts/Error";
import GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS from "../AssignmentSchema";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import * as Styled from "../../../../theme/Popup";
import DropZone from "../../../Uploader";
import {
  isSubmittingAtom,
  modalAtom,
  successAlertAtom,
} from "../../../../state/store";
import Modal from "../../../Modal";

const CREATE_ASSIGNMENT = gql`
  mutation(
    $assignmentName: String!
    $note: String
    $link: String
    $documentName: String
    $documentUrl: String
  ) {
    createAssignment(
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

const INITIAL_STATE = {
  assignmentName: "",
  note: "",
  link: "",
  documentName: "",
  documentUrl: "",
};

const AssignmentCreate = () => {
  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, target } = modal;

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);

  const [{ assignmentName, note, link }, setAssignmentState] = useState(
    INITIAL_STATE
  );
  const [drop, setDrop] = useState(null);

  // Mutation Hooks
  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [createAssignment, { loading, error }] = useMutation(
    CREATE_ASSIGNMENT,
    {
      onError: (err) => {
        setSuccessAlert((a) => (a = false));
      },
      onCompleted: (data) => {
        setSuccessAlert((a) => (a = true));
      },
      update(cache, { data: { createAssignment } }) {
        const data = cache.readQuery({
          query: GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS,
        });

        cache.writeQuery({
          query: GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS,
          data: {
            ...data,
            assignments: {
              ...data.assignments,
              edges: [createAssignment, ...data.assignments.edges],
              pageInfo: data.assignments.pageInfo,
            },
          },
        });
      },
    }
  );

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
    const newFilename = `docs/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setAssignmentState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isInvalid = assignmentName === "";

  const onSubmit = async (e, createAssignment) => {
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

        await createAssignment({
          variables: {
            assignmentName: assignmentName,
            note: note,
            link: link,
            documentName: drop.name,
            documentUrl: url,
          },
        }).then(async ({ data }) => {
          setAssignmentState({ ...INITIAL_STATE });
        });
        setIsSubmitting((a) => (a = false));
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    } else {
      try {
        await createAssignment({
          variables: {
            assignmentName: assignmentName,
            note: note,
            link: link,
          },
        }).then(async ({ data }) => {
          setAssignmentState({ ...INITIAL_STATE });
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
    setDrop(null);
    setSuccessAlert((a) => (a = false));
  };

  return (
    <>
      {toggleOn && target === "assignmentcreate" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>Create An Assignment ...</Styled.PopupTitle>
            <Styled.PopupFooterButton onClick={toggleOffModal}>
              <Styled.CloseSpan />
            </Styled.PopupFooterButton>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <form onSubmit={(e) => onSubmit(e, createAssignment)}>
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
                  value={link}
                  onChange={onChange}
                  type="text"
                />
              </Styled.Label>

              <DropZone
                setDrop={setDrop}
                handleChange={handleChange}
                isDocument={"isDocument"}
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
              {successAlert && <SuccessMessage message="Assignment Created!" />}
              {(error || s3Error) && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

export default AssignmentCreate;
