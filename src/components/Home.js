import React, { useState, useEffect } from "react";

import axios from "axios";
import HomePagePosts from "./HomePagePosts";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://blog-amaru.herokuapp.com/post").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <div style={{ width: "60%", margin: "auto", marginTop: "50px" }}>
      {data.map((item) => (
        <HomePagePosts
          title={item.title}
          name={item.name}
          date={item.date}
          tags={item.tags}
          thumbnail={item.thumbnail}
          comments={item.comments}
          id={item._id}
        />
      ))}
    </div>
  );
}

export default Home;
