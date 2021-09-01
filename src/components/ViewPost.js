import React, { useState, useEffect, useRef, useContext } from "react";

//Share
import { FacebookShareButton, TwitterShareButton } from "react-share";
import FacebookIconUI from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

//Context
import { AuthContext } from "../helpers/AuthContext";

import axios from "axios";

//Like icons
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

//Comment icons
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

//CSS
import "../styles/ViewPost.css";

//Converting string to HTML
import toHtml from "string-to-html";
import Comments from "./Comments";

function ViewPost() {
  const { authState } = useContext(AuthContext);

  //Getting post ID from the path name
  let path = window.location.pathname;
  let pathLength = path.length;
  let post_id = path.slice(9, pathLength);

  //Setting the states for variables
  const [data, setData] = useState({
    comments: [],
    date: "",
    description: "<div></div>",
    likes: 0,
    name: "",
    tags: [],
    thumbnail: "",
    title: "",
    _id: "",
  });

  //Getting the details of the post
  useEffect(() => {
    axios
      .get(`https://blog-amaru.herokuapp.com/post/byID/${post_id}`)
      .then((response) => {
        console.log(response);
        setData({
          comments: response.data.comments,
          date: response.data.date,
          description: response.data.description,
          likes: response.data.likes,
          name: response.data.name,
          tags: response.data.tags,
          thumbnail: response.data.thumbnail,
          title: response.data.title,
          _id: response.data._id,
        });
      });
  }, [post_id]);

  //Set state for like
  const [likeState, setLikeState] = useState(false);

  //Creating a ref to display post
  const containerRef = useRef(null);

  //Appending the post to the ref
  useEffect(() => {
    containerRef.current.innerHTML = "";
    const eachPost = new toHtml(data.description);
    containerRef.current.appendChild(eachPost);
  }, [data.description]);
  console.log(data);

  //Handle like
  const handleLike = () => {
    if (likeState === false) {
      setData({ ...data, likes: data.likes + 1 });
    } else {
      setData({ ...data, likes: data.likes - 1 });
    }
    axios.post("https://blog-amaru.herokuapp.com/post/likes", {
      id: data._id,
      likes: likeState,
    });
    setLikeState(!likeState);
  };

  //Handle Comment
  const [comment, setComment] = useState("");

  //Post Comment
  const postComment = () => {
    axios
      .post("https://blog-amaru.herokuapp.com/post/comment", {
        name: authState.name,
        id: authState.id,
        comment: comment,
        postID: data._id,
      })
      .then(() => {
        data.comments.push(...data.comments, {
          name: authState.name,
          id: authState.id,
          comment: comment,
        });
        window.location.reload(1);
      });
  };

  //Comment field
  const addComment = () => {
    if (authState.status === false) {
      return <p>Please login to add a comment</p>;
    } else {
      let name = authState.name;
      return (
        <div className="add_comment">
          <p style={{ fontSize: "24px" }}>Add a comment</p>
          <div className="gray_line"></div>
          <div style={{ display: "flex" }}>
            <p style={{ padding: "0px 0px 10px 0px" }}>Posting as: </p>
            <p style={{ marginLeft: "5px" }}>{name}</p>
          </div>
          <div>
            <textarea
              style={{ width: "100%", resize: "none", fontFamily: "Poppins" }}
              rows="8"
              placeholder="What are your thoughts?"
              className="comment_box"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              onClick={postComment}
              style={{ margin: "0px 0px 15px 0px" }}
            >
              Submit
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="post_container">
      <div>
        <h1>{data.title}</h1>
        <div>
          <p className="author_name">By {data.name}</p>
          <p className="post_date">{data.date}</p>
        </div>
        <div>
          <div ref={containerRef}></div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
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
            <div onClick={handleLike} style={{ cursor: "pointer" }}>
              {likeState === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </div>

            <p>{data.likes}</p>
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
            <ChatBubbleOutlineIcon /> {data.comments.length}
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "30px" }}>
          <p>Tags:&nbsp;</p>
          {data.tags.map((tag) => (
            <>
              <a style={{ textDecoration: "none" }} href={`/tags/${tag}`}>
                <p className="post_tags">{tag}</p>
              </a>
            </>
          ))}
        </div>
        <div style={{ display: "flex", height: "50px", marginTop: "30px" }}>
          <p>Share:&nbsp;&nbsp;&nbsp;</p>
          <FacebookShareButton url={window.location.href} quote={data.title}>
            <FacebookIconUI
              style={{ color: "#3b5998", transform: "scale(1.5)" }}
              // logoFillColor="white"
            />
          </FacebookShareButton>
          <div style={{ marginLeft: "20px" }}>
            <TwitterShareButton url={window.location.href} title={data.title}>
              <TwitterIcon
                style={{
                  color: "#1DA1F2",
                  transform: "scale(1.5)",
                }}
              />
            </TwitterShareButton>
          </div>
        </div>
      </div>
      {addComment()}
      <p style={{ margin: "40px 0px 10px 0px", fontSize: "20px" }}>Comments:</p>
      {data.comments.length === 0 && (
        <p style={{ textAlign: "center", fontWeight: "300" }}>
          There are no comments
        </p>
      )}
      {data.comments
        .slice(0)
        .reverse()
        .map((comm) => (
          <Comments name={comm.name} comment={comm.comment} />
        ))}
    </div>
  );
}

export default ViewPost;
