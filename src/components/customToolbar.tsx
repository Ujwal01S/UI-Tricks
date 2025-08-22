import React from "react";
import ReactQuill from "react-quill";
import formats, { FormatOption } from "./tooltoptions";

interface CustomToolbarProps {
  quillRef?: React.RefObject<ReactQuill>;
}

const renderOptions = (formatData: FormatOption, index: number) => {
  const { className, options } = formatData;
  if (!options) return null;

  return (
    <select key={`${className}-${index}`} className={className}>
      <option value=''>Normal Text</option>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

const renderSingle = (
  formatData: FormatOption,
  index: number,
  quillRef?: React.RefObject<ReactQuill>
) => {
  const { className, value } = formatData;
  const key = `${className}-${value || index}`;

  // ✅ Create completely custom image button
  if (className === "ql-image") {
    const handleImageClick = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = () => {
        const file = input.files?.[0];
        if (file && quillRef?.current) {
          const reader = new FileReader();
          reader.onload = () => {
            const quill = quillRef.current?.getEditor();
            const range = quill?.getSelection();
            if (quill && reader.result) {
              quill.insertEmbed(
                range ? range.index : 0,
                "image",
                reader.result
              );
            }
          };
          reader.readAsDataURL(file);
        }
      };
    };

    return (
      <button
        key={key}
        type='button'
        onClick={handleImageClick}
        className='custom-image-button'
        style={{
          background: "none",
          border: "1px solid #ccc",
          padding: "5px 8px",
          cursor: "pointer",
          borderRadius: "3px",
          margin: "0 2px",
        }}
      >
        <svg
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
          <circle cx='8.5' cy='8.5' r='1.5' />
          <polyline points='21,15 16,10 5,21' />
        </svg>
      </button>
    );
  }

  return <button key={key} className={className} value={value} type='button' />;
};

const CustomToolbar: React.FC<CustomToolbarProps> = ({ quillRef }) => (
  <div
    id='toolbar'
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px",
      borderBottom: "1px solid #ccc",
      flexWrap: "wrap",
    }}
  >
    {formats.map((classes, groupIndex) => (
      <span
        className='ql-formats'
        key={`group-${groupIndex}`}
        style={{ display: "flex", alignItems: "center", gap: "2px" }}
      >
        {classes.map((formatData, itemIndex) =>
          "options" in formatData && formatData.options
            ? renderOptions(formatData, itemIndex)
            : renderSingle(formatData, itemIndex, quillRef)
        )}
      </span>
    ))}
  </div>
);

export default CustomToolbar;
