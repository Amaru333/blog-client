import React from "react";

function Comments({ name, comment }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <p>
        <b>{name}:</b>
      </p>
      <p>{comment}</p>
    </div>
  );
}

export default Comments;
