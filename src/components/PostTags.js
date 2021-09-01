import React, { useState, useEffect } from "react";

import axios from "axios";
import HomePagePosts from "./HomePagePosts";

function PostTags() {
  const [data, setData] = useState([]);
  let tag_post = [];

  let path = window.location.pathname;
  let pathLength = path.length;
  let tag = path.slice(6, pathLength);

  useEffect(() => {
    axios
      .get(`https://blog-amaru.herokuapp.com/post/tags/${tag}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }, []);

  for (let i = 0; i < data.length; i++) {
    if (data[i].tags.includes(`${tag}`)) {
      tag_post.push(data[i]);
    }
  }

  return (
    <div style={{ width: "60%", margin: "auto", marginTop: "50px" }}>
      {tag_post.map((item) => (
        <HomePagePosts
          title={item.title}
          name={item.name}
          date={item.date}
          tags={item.tags}
          thumbnail={item.thumbnail}
          comments={item.comments}
          id={item._id}
          likes={item.likes}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default PostTags;
