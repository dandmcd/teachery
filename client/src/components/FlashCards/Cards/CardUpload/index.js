import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DropZone({ drop, setDrop }) {
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
    isDragReject
  } = useDropzone({
    onDrop,
    noKeyboard: true,
    maxSize: 10485760,
    multiple: false,
    accept: ["image/*"]
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragAccept, isDragReject]
  );
  console.log(acceptedFiles);
  console.log(drop);

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here, or click to select a file</p>
        <em>(Only image files will be accepted)</em>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{acceptedFilesItems}</ul>
      </aside>
    </section>
  );
}

//temp css
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744",
  backgroundColor: "red"
};
