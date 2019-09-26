import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Button from "../../../../theme/Button";

const getColor = props => {
  if (props.isDragAccept) {
    return "#91d251";
  }
  if (props.isDragReject) {
    return "#d96e6e";
  }
  if (props.isDragActive) {
    return "#e49999";
  }
  return "#bdafaf";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-left: 5px;
  margin-right: 5px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #faf9f9;
  color: ${props => props.theme.textLight};
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const AcceptedList = styled.ul`
  list-style-type: none;
  list-style-position: inside;
  margin: 0;
  padding: 0;
`;

const AcceptedItem = styled.li`
  list-style-type: none;
  list-style-position: inside;
  margin: 0;
  padding: 0;
`;

const RejectedList = styled.ul`
  list-style-type: none;
  list-style-position: inside;
  margin: 0;
  padding: 0;
`;

const RejectedFileWarning = styled.h4`
  color: ${props => props.theme.error};
`;

const RejectedItem = styled.li`
  list-style-type: none;
  list-style-position: inside;
  margin: 0;
  padding: 0;
  font-size: 12px;
`;

export default function DropZone({ props, drop, setDrop }) {
  const onDrop = useCallback(
    acceptedFiles => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        console.log(acceptedFiles);
      };

      setDrop(acceptedFiles[0]);
    },
    [setDrop]
  );
  const {
    rejectedFiles,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxSize: 10485760,
    multiple: false,
    accept: ["image/*"]
  });
  console.log(acceptedFiles);
  console.log(drop);

  const acceptedFilesItems = acceptedFiles.map(file => (
    <AcceptedItem key={file.path}>
      {file.path} - {file.size} bytes
    </AcceptedItem>
  ));

  const rejectedFilesItems = rejectedFiles.map(file => (
    <RejectedItem key={file.path}>
      <RejectedFileWarning>
        Rejected ~ File is not an image, or is over the 10mb limit
      </RejectedFileWarning>
      {file.path} - {file.size} bytes
    </RejectedItem>
  ));

  return (
    <section className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here, or click below to select a file</p>
        <Button type="button" onClick={open}>
          Select File
        </Button>
        <em>(Only image files will be accepted)</em>
      </Container>
      <aside>
        <h4>File to be uploaded</h4>
        <AcceptedList>{acceptedFilesItems}</AcceptedList>
        <RejectedList>{rejectedFilesItems}</RejectedList>
      </aside>
    </section>
  );
}
