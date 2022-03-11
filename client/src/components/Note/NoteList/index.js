import { useQuery } from "@apollo/react-hooks";
import { useAtom } from "jotai";
import React from "react";

import { modalAtom, successAlertAtom } from "../../../state/store";
import * as Styled from "../../../theme/Popup";
import Modal from "../../Modal";
import NoteItem from "../NoteItem";
import styled from "styled-components";
import NoteCreate from "../NoteCreate";
import NOTES_QUERY from "../NoteSchema";
import Loading from "../../Alerts/Loading";
import ErrorMessage from "../../Alerts/Error";

const NoteList = () => {
  const [modal, setModal] = useAtom(modalAtom);
  const { toggleOn, modalId, target } = modal;
  const [, setSuccessAlert] = useAtom(successAlertAtom);

  const { data, error, loading } = useQuery(NOTES_QUERY, {
    variables: { id: modalId },
  });
  if (loading && !data) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  }

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
      {toggleOn && target === "notemodal" ? (
        <Modal toggleOn={toggleOn} onToggleOffModal={toggleOffModal}>
          <Styled.PopupHeader>
            <Styled.PopupTitle>Task Notes ...</Styled.PopupTitle>
            <Styled.PopupFooterButton onClick={toggleOffModal}>
              <Styled.CloseSpan />
            </Styled.PopupFooterButton>
          </Styled.PopupHeader>
          <Styled.PopupBody>
            <NoteContainer>
              {data.assignedTask.notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  role={data.assignedTask.user.role}
                />
              ))}
            </NoteContainer>
            <NoteCreate />
          </Styled.PopupBody>
        </Modal>
      ) : null}
    </>
  );
};

const NoteContainer = styled.div`
  position: block;
  width: 50%;
  height: 260px;
  margin: auto;
  padding: 1em;
  margin-top: 5px;
  margin-bottom: 5px;
  overflow-y: scroll;
  border-radius: 20px;
  background: ${(props) => props.theme.neutralLight};
  text-align: left;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default NoteList;
