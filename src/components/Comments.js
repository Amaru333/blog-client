import React from "react";

import ProfilePic from "../images/profile-pic.jpg";

function Comments({ name, comment }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "20px 0px 20px 0px",
      }}
    >
      <div>
        <img
          src={ProfilePic}
          style={{
            width: "40px",
            borderRadius: "20px",
            margin: "0px 20px 0px 0px",
          }}
        />
      </div>
      <div>
        <p>
          <b>{name}</b>
        </p>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default Comments;
