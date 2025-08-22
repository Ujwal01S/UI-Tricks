import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./customToolbar";

const QuillDemo: React.FC = () => {
  const [text, setText] = useState<string>("");
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  const formats: string[] = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];

  return (
    <>
      <CustomToolbar quillRef={quillRef} />
      <ReactQuill
        ref={quillRef}
        value={text}
        onChange={setText}
        modules={modules}
        formats={formats}
      />
    </>
  );
};

export default QuillDemo;
