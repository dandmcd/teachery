import React, { useCallback, useState, useEffect } from "react";
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
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
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

const ThumbContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0px;
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

export default function DropZone({ props, drop, setDrop }) {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(
    acceptedFiles => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        console.log(acceptedFiles);
      };

      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );

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
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const rejectedFilesItems = rejectedFiles.map(file => (
    <RejectedItem key={file.path}>
      <RejectedFileWarning>
        Rejected ~ File is not an image, or is over the 10mb limit
      </RejectedFileWarning>
      {file.path} - {file.size} bytes
    </RejectedItem>
  ));

  const thumbs = files.map(file => (
    <Thumb key={file.name}>
      <ThumbInner>
        <Img src={file.preview} />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

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
      <ThumbContainer>{thumbs}</ThumbContainer>
      <aside>
        <h4>File to be uploaded</h4>
        <ul>{acceptedFilesItems}</ul>
        <RejectedList>{rejectedFilesItems}</RejectedList>
      </aside>
    </section>
  );
}
