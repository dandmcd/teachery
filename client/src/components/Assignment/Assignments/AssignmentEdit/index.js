import React, { useState, useEffect, useCallback } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

import { useAtom } from "jotai";
import {
  modalAtom,
  successAlertAtom,
  isSubmittingAtom,
} from "../../../../state/store";

import * as Styled from "../../../../theme/Popup";
import DropZone from "../../../Uploader";
import Loading from "../../../Alerts/Loading";
import SuccessMessage from "../../../Alerts/Success";
import ErrorMessage from "../../../Alerts/Error";
import withSession from "../../../Session/withSession";
import Modal from "../../../Modal";
import download from "../../../../assets/download.png";
import { S3SIGNMUTATION, UPDATE_ASSIGNMENT } from "./schema";

const AssignmentEdit = ({ session }) => {
  const client = useApolloClient();

  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, modalId, target, editImg, editFileText } = modal;

  const [successAlert, setSuccessAlert] = useAtom(successAlertAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);

  const [s3SignMutation, { error: s3Error }] = useMutation(S3SIGNMUTATION);
  const [updateAssignment, { loading, error }] = useMutation(
    UPDATE_ASSIGNMENT,
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
      const currentAssignment = client.readFragment({
        id: modalId,
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
        `,
      });

      setState(currentAssignment);
    }
  }, [client, toggleOn, modalId]);

  const [state, setState] = useState({
    id: null,
    assignmentName: "",
    note: "",
    link: "",
    documentName: "",
    documentUrl: "",
  });
  const { id, assignmentName, note, link, documentName, documentUrl } = state;

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
    if (editImg && documentUrl === null) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Add File" })
      );
      setDrop(null);
    } else if (!editImg && documentUrl === null) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "No File" })
      );
    } else if (!editImg && documentUrl) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Keep File" })
      );
    } else if (editImg && documentUrl) {
      setModal(
        (m) => (m = { ...m, editImg: !m.editImg, editFileText: "Change" })
      );
    }
  }, [editImg, documentUrl, setModal]);

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

  const isInvalid = assignmentName === "";

  const onSubmit = async (e, updateAssignment) => {
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
        await updateAssignment({
          variables: {
            id: id,
            assignmentName,
            note,
            link,
            documentName: drop.name,
            documentUrl: url,
          },
        });
        setIsSubmitting((a) => (a = false));
      } catch (error) {
        setIsSubmitting((a) => (a = false));
      }
    } else if (documentUrl === "") {
      await updateAssignment({
        variables: {
          id: id,
          assignmentName: assignmentName,
          note: note,
          link: link,
          documentName: null,
          documentUrl: null,
        },
      });
    } else {
      try {
        await updateAssignment({
          variables: {
            id: id,
            assignmentName: assignmentName,
            note: note,
            link: link,
            documentName: documentName,
            documentUrl: documentUrl,
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
      assignmentName: assignmentName,
      note: note,
      link: link,
      documentName: "",
      documentUrl: null,
    });
    setModal(
      (m) =>
        (m = {
          ...m,
          editFileText: "Add File",
        })
    );
  };

  return (
    <>
      {toggleOn && target === "edit" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>Edit Assignment ...</Styled.PopupTitle>
            <Styled.PopupFooterButton onClick={toggleOffModal}>
              <Styled.CloseSpan />
            </Styled.PopupFooterButton>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <form onSubmit={(e) => onSubmit(e, updateAssignment)}>
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
              {documentUrl ? (
                <Styled.CardDiv>
                  <Styled.CardFile
                    href={documentUrl}
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
              {documentUrl !== null && (
                <Styled.DeleteButton
                  documentUrl={documentUrl}
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
              {successAlert && <SuccessMessage message="Assignment Updated!" />}
              {(error || s3Error) && <ErrorMessage error={error} />}
            </form>
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

AssignmentEdit.propTypes = {
  session: PropTypes.object,
};

export default withSession(AssignmentEdit);
