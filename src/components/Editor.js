import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/Write.css";

export default function Editor(props) {
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
  ];

  const [text, setText] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    // console.log(ReactQuill);
    console.log(editorRef.current);
    editorRef.current.editingArea.style.height = "500px";
  }, []);

  const handleChange = (val) => {
    setText(val);
  };

  const save = () => {
    console.log("hey");
    console.log(text);
    // console.log(ReactQuill.getContents());
  };

  return (
    <div>
      <ReactQuill
        ref={editorRef}
        modules={modules}
        formats={formats}
        value={text}
        onChange={(val) => handleChange(val)}
        placeholder="Write your story here..."
      />
      <button onClick={save}>Save</button>
    </div>
  );
}
