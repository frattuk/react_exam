import React, { useEffect, useRef, useState } from "react";

const defaultStyle = {
  display: "block",
  overflow: "hidden",
  resize: "none",
  width: "500px",
  backgroundColor: "white",
};
const AutoHeightTextarea = ({ style = defaultStyle, ...etc }) => {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    textareaRef.current.style.height = "100px";

    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [currentValue]);

  return (
    <textarea
      ref={textareaRef}
      style={style}
      {...etc}
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
    />
  );
};

export default AutoHeightTextarea;
