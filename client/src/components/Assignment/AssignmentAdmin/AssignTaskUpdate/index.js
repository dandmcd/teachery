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

const UPDATE_ASSIGNED_TASK = gql`
  mutation(
    $id: ID!
    $assignedTo: String!
    $dueDate: String!
    $status: Status!
    $updatedDocumentName: String
    $updatedDocumentUrl: String
  ) {
    updateAssignedTask(
      id: $id
      assignedTo: $assignedTo
      dueDate: $dueDate
      status: $status
      updatedDocumentName: $updatedDocumentName
      updatedDocumentUrl: $updatedDocumentUrl
    ) {
      id
      assignedTo
      dueDate
      status
      updatedDocumentName
      updatedDocumentUrl
    }
  }
`;

const STATUS_ENUM = gql`
  query {
    __type(name: "Status") {
      name
      enumValues {
        name
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

const AssignTaskUpdate = ({ session }) => {
  const client = useApolloClient();
  const { data } = useQuery(gql`
    query Toggle {
      toggleSuccess @client
      toggleAssignUpdate @client
      current @client
      isSubmitting @client
      editImg @client
    }
  `);
  const {
    toggleSuccess,
    toggleAssignUpdate,
    current,
    isSubmitting,
    editImg
  } = data;

  const { data: enumData, loading: enumLoading, error: enumError } = useQuery(
    STATUS_ENUM
  );
  let menuItems = [];
  if (enumLoading || enumError) {
    menuItems = [];
  } else {
    menuItems = enumData.__type.enumValues;
  }

  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [updateAssignedTask, { loading, error }] = useMutation(
    UPDATE_ASSIGNED_TASK,
    {
      onError: err => {
        client.writeData({ data: { toggleSuccess: false } });
      },
      onCompleted: data => {
        client.writeData({ data: { toggleSuccess: true } });
      }
    }
  );

  const [state, setState] = useState({
    id: null,
    assignedTo: "",
    dueDate: "",
    status: "",
    updatedDocumentName: "",
    updatedDocumentUrl: ""
  });
  const {
    id,
    assignedTo,
    dueDate,
    status,
    updatedDocumentName,
    updatedDocumentUrl
  } = state;

  useEffect(() => {
    if (toggleAssignUpdate) {
      const currentAssignedTask = client.readFragment({
        id: current,
        fragment: gql`
          fragment assignedTask on AssignedTask {
            id
            assignedTo
            dueDate
            status
            updatedDocumentName
            updatedDocumentUrl
            createdAt
          }
        `
      });
      setState(currentAssignedTask);
    }
  }, [client, current, toggleAssignUpdate]);

  console.log(state);

  const [drop, setDrop] = useState(null);

  useEffect(() => {
    if (toggleSuccess) {
      setTimeout(() => {
        client.writeData({ data: { toggleSuccess: !toggleSuccess } });
      }, 5000);
    }
  }, [client, toggleSuccess]);

  // const handleDrop = e => {
  //   setDrop(e.target.value);
  //   console.log(drop);
  // };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleClick = () => {
    client.writeData({ data: { editImg: !editImg } });
  };

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

  const isInvalid = assignedTo === "" || dueDate === "" || status === "";

  const onSubmit = async (e, updateAssignedTask) => {
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
        await updateAssignedTask({
          variables: {
            id: id,
            assignedTo,
            dueDate,
            status: !superRole ? "SUBMITTED" : status,
            updatedDocumentName: drop.name,
            updatedDocumentUrl: url
          }
        }).then(async ({ data }) => {
          setState({
            id: id,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
            updatedDocumentName: "",
            updatedDocumentUrl: ""
          });
        });
        client.writeData({ data: { isSubmitting: false } });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    } else if (updatedDocumentUrl === "") {
      console.log("It's an else if");
      await updateAssignedTask({
        variables: {
          id: id,
          assignedTo,
          dueDate,
          status,
          updatedDocumentName: null,
          updatedDocumentUrl: null
        }
      });
    } else {
      try {
        console.log("It's else");
        await updateAssignedTask({
          variables: {
            id: id,
            assignedTo,
            dueDate,
            status,
            updatedDocumentName: updatedDocumentName,
            updatedDocumentUrl: updatedDocumentUrl
          }
        }).then(async ({ data }) => {
          setState({
            id: id,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
            updatedDocumentName: "",
            updatedDocumentUrl: ""
          });
        });
      } catch (error) {
        client.writeData({ data: { isSubmitting: false } });
      }
    }
  };

  // const handleChange = e => {
  //   setDrop(e.target.value);
  // };

  const togglePopupModal = () => {
    client.writeData({
      data: {
        toggleAssignUpdate: !toggleAssignUpdate,
        editImg: false
      }
    });
  };
  const innerRef = useRef(null);
  useOuterClickNotifier(togglePopupModal, innerRef);

  let superRole;
  if (session && session.me && session.me.role === "TEACHER") {
    superRole = true;
  } else if (session && session.me && session.me.role === "ADMIN") {
    superRole = true;
  }
  console.log(session);

  return (
    <Fragment>
      {toggleAssignUpdate ? (
        <Styled.PopupContainer>
          <Styled.PopupInnerExtended ref={innerRef}>
            <Styled.PopupHeader>
              <Styled.PopupTitle>Update assigned task ...</Styled.PopupTitle>
              <Styled.PopupFooterButton onClick={togglePopupModal}>
                <Styled.CloseSpan />
              </Styled.PopupFooterButton>
            </Styled.PopupHeader>
            <Styled.PopupBody>
              <form onSubmit={e => onSubmit(e, updateAssignedTask)}>
                {superRole && (
                  <Fragment>
                    <Styled.Label>
                      <Styled.Span>
                        <Styled.LabelName>Due Date</Styled.LabelName>
                      </Styled.Span>
                      <Styled.Input
                        name="dueDate"
                        value={dueDate}
                        onChange={onChange}
                        type="date"
                      />
                    </Styled.Label>
                    <Styled.Select>
                      <Styled.SelectBox
                        name="status"
                        value={status}
                        onChange={onChange}
                        type="text"
                        placeholder="Set Task Status"
                      >
                        <option value="" disabled>
                          Select status
                        </option>
                        {menuItems.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </Styled.SelectBox>
                    </Styled.Select>
                  </Fragment>
                )}
                {updatedDocumentUrl !== null ? (
                  <div>
                    <Styled.CardImg
                      src={updatedDocumentUrl}
                      alt={updatedDocumentUrl}
                    />
                  </div>
                ) : null}
                <Styled.AddButton type="button" onClick={handleClick}>
                  {!editImg && updatedDocumentUrl === null
                    ? "Add File"
                    : !editImg
                    ? "Change"
                    : "Keep Original"}
                </Styled.AddButton>
                {updatedDocumentUrl !== null && (
                  <Styled.DeleteButton
                    updatedDocumentUrl={updatedDocumentUrl}
                    type="button"
                    onClick={() =>
                      setState({
                        id: id,
                        assignedTo: assignedTo,
                        dueDate: dueDate,
                        status: status,
                        updatedDocumentName: "",
                        updatedDocumentUrl: ""
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
                  <SuccessMessage message="Assigned Task Updated!" />
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

export default withSession(AssignTaskUpdate);
