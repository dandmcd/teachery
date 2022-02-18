import moment from "moment";
import React from "react";
import styled from "styled-components";

const NoteItem = ({ note, role }) => {
  return (
    <NoteBlock role={role} note={note}>
      <Username role={role} note={note}>
        {note.user.username}
      </Username>
      <DateCreated role={role} note={note}>
        {moment(note.createdAt).format("MM-DD-YYYY")}
      </DateCreated>
      <Text role={role} note={note}>
        {note.text}
      </Text>
    </NoteBlock>
  );
};

const NoteBlock = styled.div`
  border-radius: 20px;
  text-align: ${(props) =>
    props.role && props.note.user.role === "ADMIN" ? "left" : "right"};
  background-color: ${(props) =>
    props.role && props.note.user.role === "ADMIN"
      ? props.theme.primaryLight
      : props.theme.secondaryLight};
`;

const Username = styled.h5`
  font-weight: 800;
  margin: 0 1em 0 1em;
  color: ${(props) =>
    props.role && props.note.user.role === "ADMIN"
      ? props.theme.primary
      : props.theme.secondary};
`;

const DateCreated = styled.h5`
  font-weight: 200;
  margin: 0 1em 0 1em;
  color: ${(props) => props.theme.textLight};
`;

const Text = styled.h4`
  font-weight: 400;
  margin: 0.1em 2em 0.7em 2em;
`;

export default NoteItem;
