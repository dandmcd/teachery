import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";

import useOuterClickNotifier from "../../Alerts";
import ErrorMessage from "../../Alerts/Error";
import GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS from "../AssignmentAdmin/AssignmentAdminSchema";
import Loading from "../../Loading";
import SuccessMessage from "../../Alerts/Success";
import * as Styled from "../../../theme/Popup";
import Button from "../../../theme/Button";
import DropZone from "../../Uploader";

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
        status
        dueDate
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
  documentUrl: ""
};

const AssignmentCreate = () => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      togglePopup @client
      isDocument @client
    }
  `);
  const { toggleSuccess, togglePopup, isDocument } = data;

  const [{ assignmentName, note, link }, setAssignmentState] = useState(
    INITIAL_STATE
  );
  const [drop, setDrop] = useState(null);

  // Mutation Hooks
  const [s3SignMutation, { loading: s3Loading, error: s3Error }] = useMutation(
    S3SIGNMUTATION
  );
  const [createAssignment, { loading, error }] = useMutation(
    CREATE_ASSIGNMENT,
    {
      onError: err => {
        client.writeData({ data: { toggleSuccess: false } });
      },
      onCompleted: data => {
        client.writeData({ data: { toggleSuccess: true } });
      },
      update(
        cache,
        {
          data: { createAssignment }
        }
      ) {
        const data = cache.readQuery({
          query: GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS
        });

        cache.writeQuery({
          query: GET_PAGINATED_ASSIGNMENTS_WITH_ASSIGNED_USERS,
          data: {
            ...data,
            assignments: {
              ...data.assignments,
              edges: [createAssignment, ...data.assignments.edges],
              pageInfo: data.assignments.pageInfo
            }
          }
        });
      }
    }
  );

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

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
    const newFilename = `docs/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setAssignmentState(prevState => ({ ...prevState, [name]: value }));
  };

  const isInvalid = assignmentName === "";

  const onSubmit = async (e, createAssignment) => {
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

      await createAssignment({
        variables: {
          assignmentName: assignmentName,
          note: note,
          link: link,
          documentName: drop.name,
          documentUrl: url
        }
      }).then(async ({ data }) => {
        setAssignmentState({ ...INITIAL_STATE });
      });
    } else {
      try {
        await createAssignment({
          variables: {
            assignmentName: assignmentName,
            note: note,
            link: link
          }
        }).then(async ({ data }) => {
          setAssignmentState({ ...INITIAL_STATE });
        });
      } catch (error) {}
    }
  };

  const handleChange = e => {
    setDrop(e.target.value);
  };

  // Onclick toggle popup for mutation form
  const togglePopupModal = () => {
    client.writeData({
      data: { togglePopup: !togglePopup, isDocument: !isDocument }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  return (
    <Container>
      <AssignButton type="button" onClick={togglePopupModal}>
        New Assignment
      </AssignButton>
      {togglePopup ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupTitle>Create an assignment ...</Styled.PopupTitle>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, createAssignment)}>
                <Styled.Input
                  name="assignmentName"
                  value={assignmentName}
                  onChange={onChange}
                  type="text"
                  placeholder="Assignment Name*"
                />
                <Styled.InputTextArea
                  name="note"
                  value={note}
                  onChange={onChange}
                  type="text"
                  placeholder="Add details and notes"
                />
                <Styled.Input
                  name="link"
                  value={link}
                  onChange={onChange}
                  type="text"
                  placeholder="Add a URL link"
                />
                <DropZone
                  setDrop={setDrop}
                  handleChange={handleChange}
                  isDocument={isDocument}
                />
                <Button disabled={isInvalid || loading} type="submit">
                  Submit
                </Button>
                {(loading || s3Loading) && <Loading />}
                {toggleSuccess && (
                  <SuccessMessage message="Assignment Created!" />
                )}
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

const AssignButton = styled(Button)`
  font-size: 10px;
`;

export default AssignmentCreate;
