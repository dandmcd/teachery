import React from "react";

export default function TagItem({ tag: { tagname } }) {
  console.log(tagname);
  return (
    <div>
      <div>
        <h5>{tagname}</h5>
      </div>
    </div>
  );
}
