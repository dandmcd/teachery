import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

export default function DropZone({ drop, setDrop, handleChange }) {
  const {
    rejectedFiles,
    acceptedFiles,
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    maxSize: 10485760,
    multiple: false,
    accept: ["image/*", ".pdf"],
    onDrop: files => setDrop(files[0])
  });
  console.log(drop);
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const files = acceptedFiles.map(file => (
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
        <input {...getInputProps()} onChange={handleChange} onClick={open} />
        <p>Drag 'n' drop a file here, or click to select a file</p>
        <em>(Only *.jpg, *.gif, *.png and *.pdf images will be accepted)</em>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
        <h4>Rejected Files</h4>
        <ul>{rejectedFilesItems}</ul>
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
