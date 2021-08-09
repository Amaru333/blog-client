import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";

//Quill Editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/Write.css";

//Tags
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

//Context
import { AuthContext } from "../helpers/AuthContext";

//CSS
import "../styles/Write.css";

function Write() {
  //Context
  const { authState } = useContext(AuthContext);

  //Editor Module
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // [{ size: [ 'small', false, 'large', 'huge' ]}]
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      [{ color: [] }, { background: [] }],
      // [{ font: [] }],
      [{ align: [] }],
      [{ script: "sub" }, { script: "super" }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "script",
  ];

  const [text, setText] = useState("");

  const editorRef = useRef(null);

  useEffect(() => {
    // console.log(ReactQuill);
    editorRef.current.editingArea.style.height = "500px";
  }, []);

  const handleChange = (val) => {
    setText(val);
  };

  //If user isn't logged in, redirect to login page
  {
    !localStorage.getItem("accessToken") && (window.location.href = "/login");
  }

  //Setting state for thumbnail and preview
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  //Setting state for tags
  const [tags, setTags] = useState([]);

  //Setting state for title
  const [title, setTitle] = useState();

  //Handle thumbnail
  const handleImage = (event) => {
    const finalImage = event.target.files[0];
    setImage(finalImage);
    event.target.files[0] &&
      setPreview(URL.createObjectURL(event.target.files[0]));
  };

  //Get today's date in the format Month-dd, yyyy
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const outputDate = month + " " + day + ", " + year;

  //Set errors
  const [imageError, setImageError] = useState();

  //Submit data to the backend
  const onSubmit = () => {
    const data = new FormData();
    data.append("file", image);
    axios
      .post("https://blog-amaru.herokuapp.com/uploadImage", data)
      .then((response) => {
        if (response.data === null || response.data === "") {
          setImageError("Please select an Image");
        } else {
          axios
            .post(
              "https://blog-amaru.herokuapp.com/post",
              {
                title: title,
                name: authState.name,
                description: text,
                thumbnail: response.data.filename,
                likes: 0,
                tags: tags,
                date: outputDate,
              },
              {
                headers: { accessToken: localStorage.getItem("accessToken") },
              }
            )
            .then((response) => {
              window.location.href = `/article/${response.data._id}`;
            });
        }
      });
  };

  return (
    <div className="write_post">
      <div className="post_form_container">
        {/* Form Title */}
        <input
          type="field"
          className="text_field"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/*Form content */}
        <div>
          <ReactQuill
            ref={editorRef}
            modules={modules}
            formats={formats}
            value={text}
            onChange={(val) => handleChange(val)}
            placeholder="Write your story here..."
          />
        </div>

        {/*Thumbnail */}
        <br />

        <div>
          <label for="file-upload" className="file-upload">
            Choose thumbnail
          </label>
          {/* <p style={{ color: "red", fontSize: "14px" }}>
                    {imageError && imageError}
                  </p> */}
          <input
            id="file-upload"
            className="file_upload_button"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImage}
          />
          <br />
          <br />
          {preview && (
            <>
              <p style={{ fontFamily: "poppins" }}>Thumbnail preview:</p>
              <br />
              <img className="preview_image" src={preview} />
            </>
          )}
        </div>
        <TagsInput
          value={tags}
          onChange={(e) => {
            setTags(e);
          }}
          inputProps={{ placeholder: "Add a tag" }}
        />
        <button style={{ width: "15%", marginTop: "20px" }} onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Write;
