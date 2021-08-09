import React from "react";

//Comment icons
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

function HomePagePosts({ id, title, name, date, tags, thumbnail, comments }) {
  return (
    <div
      style={{
        marginBottom: "40px",
        padding: "10px",
        borderBottom: "1px solid #DDDBDA",
      }}
    >
      <a style={{ textDecoration: "none" }} href={`/article/${id}`}>
        <div style={{ display: "flex", fontFamily: "Poppins" }}>
          <div style={{ width: "70%" }}>
            <h2>
              <a style={{ textDecoration: "none" }} href={`/article/${id}`}>
                {title}
              </a>
            </h2>
            <p>
              <span>By&nbsp;</span>
              <b>{name}</b>
              <span>&nbsp;on&nbsp;</span>
              {date}
            </p>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <p>Tags:&nbsp;</p>
              {tags.map((tag) => (
                <p>
                  <a href={`/tags/${tag}`}>{tag}</a>,&nbsp;
                </p>
              ))}
            </div>
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                border: "1px solid black",
                width: "70px",
                padding: "5px",
                placeContent: "space-around",
                borderRadius: "5px",
                height: "35px",
                marginTop: "20px",
              }}
            >
              <ChatBubbleOutlineIcon /> {comments.length}
            </div>
          </div>
          <div>
            <img
              style={{ width: "180px" }}
              src={`https://blog-amaru.herokuapp.com/images/${thumbnail}`}
            />
          </div>
        </div>
      </a>
    </div>
  );
}

export default HomePagePosts;
