import React from "react";

//Comment icons
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

//CSS
import "../styles/HomePagePost.css";

//Like icons
import FavoriteIcon from "@material-ui/icons/Favorite";

function HomePagePosts({
  id,
  title,
  name,
  date,
  tags,
  thumbnail,
  comments,
  likes,
  description,
}) {
  let des = "";
  des = description.slice(3, 3 + description.slice(3).indexOf("<"));
  return (
    <div className="home_page_post">
      <a style={{ textDecoration: "none" }} href={`/article/${id}`}>
        <div className="post_image_container">
          <div style={{ width: "70%" }}>
            <h2 className="home_page_title">
              <a style={{ textDecoration: "none" }} href={`/article/${id}`}>
                {title}
              </a>
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#303030",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <span>By&nbsp;</span>
              <b>{name}</b>
              <span>&nbsp;on&nbsp;</span>
              {date}
            </p>
            <p>{des}</p>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <p>Tags:&nbsp;</p>
              {tags.map((tag) => (
                <p>
                  <a href={`/tags/${tag}`}>{tag}</a>,&nbsp;
                </p>
              ))}
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  // border: "1px solid black",
                  width: "70px",
                  padding: "5px",
                  placeContent: "space-around",
                  // borderRadius: "5px",
                  height: "35px",
                  marginTop: "20px",
                }}
              >
                <FavoriteIcon />
                <p>{likes}</p>
              </div>
              <div
                style={{
                  marginLeft: "10px",
                  display: "flex",
                  // border: "1px solid black",
                  width: "70px",
                  padding: "5px",
                  placeContent: "space-around",
                  // borderRadius: "5px",
                  height: "35px",
                  marginTop: "20px",
                }}
              >
                <ChatBubbleOutlineIcon /> {comments.length}
              </div>
            </div>
          </div>
          <div>
            <img
              className="thumbnail_image"
              src={`https://blog-amaru.herokuapp.com/images/${thumbnail}`}
            />
          </div>
        </div>
      </a>
    </div>
  );
}

export default HomePagePosts;
