import React, { useState, useEffect, Fragment, useCallback } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

import { useAtom } from "jotai";
import {
  isSubmittingAtom,
  modalAtom,
  successAlertAtom,
} from "../../../../state/store";

import { UPDATE_ASSIGNED_TASK, STATUS_ENUM, S3SIGNMUTATION } from "./schema";
import * as Styled from "../../../../theme/Popup";
import DropZone from "../../../Uploader";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import withSession from "../../../Session/withSession";
import Modal from "../../../Modal";
import download from "../../../../assets/download.png";

const AssignTaskUpdate = ({ session }) => {
  const [state, setState] = useState({
    id: null,
    assignedTo: "",
    dueDate: "",
    status: "",
    updatedDocumentName: "",
    updatedDocumentUrl: "",
  });
  const {
    id,
    assignedTo,
    dueDate,
    status,
    updatedDocumentName,
    updatedDocumentUrl,
  } = state;

  const client = useApolloClient();

  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, modalId, target, editImg, editFileText } = modal;

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);

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
      onError: (err) => {
        setSuccessAlert((a) => (a = false));
      },
      onCompleted: (data) => {
        setSuccessAlert((a) => (a = true));
      },
    }
  );

  useEffect(() => {
    if (toggleOn && modalId) {
      const currentAssignedTask = client.readFragment({
        id: modalId,
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
        `,
      });
      setState(currentAssignedTask);
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
    if (editImg && updatedDocumentUrl === null) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Add File" })
      );
      setDrop(null);
    } else if (!editImg && updatedDocumentUrl === null) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "No File" })
      );
    } else if (!editImg && updatedDocumentUrl) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Keep File" })
      );
    } else if (editImg && updatedDocumentUrl) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Change" })
      );
    }
  }, [editImg, updatedDocumentUrl, setModal]);

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

  const isInvalid = assignedTo === "" || dueDate === "" || status === "";

  const onSubmit = async (e, updateAssignedTask) => {
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
        await updateAssignedTask({
          variables: {
            id: id,
            assignedTo,
            dueDate,
            status: !superRole ? "REVIEWING" : status,
            updatedDocumentName: drop.name,
            updatedDocumentUrl: url,
          },
        });
        setIsSubmitting((a) => (a = false));
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    } else if (updatedDocumentUrl === "") {
      await updateAssignedTask({
        variables: {
          id: id,
          assignedTo,
          dueDate,
          status,
          updatedDocumentName: null,
          updatedDocumentUrl: null,
        },
      });
    } else {
      try {
        await updateAssignedTask({
          variables: {
            id: id,
            assignedTo,
            dueDate,
            status,
            updatedDocumentName: updatedDocumentName,
            updatedDocumentUrl: updatedDocumentUrl,
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
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
      updatedDocumentName: "",
      updatedDocumentUrl: null,
    });
    setModal(
      (m) =>
        (m = {
          ...m,
          editFileText: "Add File",
        })
    );
  };

  let superRole;
  if (session && session.me && session.me.role === "TEACHER") {
    superRole = true;
  } else if (session && session.me && session.me.role === "ADMIN") {
    superRole = true;
  }

  return (
    <>
      {toggleOn && target === "assigntaskedit" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>Update assigned task ...</Styled.PopupTitle>
            <Styled.PopupFooterButton onClick={toggleOffModal}>
              <Styled.CloseSpan />
            </Styled.PopupFooterButton>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <form onSubmit={(e) => onSubmit(e, updateAssignedTask)}>
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
              {updatedDocumentUrl ? (
                <Styled.CardDiv>
                  <Styled.CardFile
                    href={updatedDocumentUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Styled.DownloadIcon src={download} /> View uploaded file
                  </Styled.CardFile>
                </Styled.CardDiv>
              ) : null}
              {!drop ? (
                <Styled.AddButton type="button" onClick={handleClick}>
                  {editFileText}
                </Styled.AddButton>
              ) : null}
              {updatedDocumentUrl !== null && (
                <Styled.DeleteButton
                  updatedDocumentUrl={updatedDocumentUrl}
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
                  Delete File
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
              {successAlert && (
                <SuccessMessage message="Assigned Task Updated!" />
              )}
              {(error || s3Error) && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

AssignTaskUpdate.propTypes = {
  session: PropTypes.object,
};

export default withSession(AssignTaskUpdate);
