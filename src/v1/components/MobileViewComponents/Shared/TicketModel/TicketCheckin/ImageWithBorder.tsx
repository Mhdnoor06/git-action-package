import React from "react";
import scannerImage from "../../../../../photos/Newuiphotos/scanner.webp";
import "./ImageWithBorder.css";
const ImageWithBorder = ({ isScanning }) => {
  return (
    <div
      className="camera-frame"
      style={{ display: isScanning ? "none" : "flex" }}
    >
      <div className="corner cornertopleft"></div>
      <div className="corner cornertopright"></div>
      <div className="corner cornerbottomleft"></div>
      <div className="corner cornerbottomright"></div>
      <img src={scannerImage} />
    </div>
  );
};

export default ImageWithBorder;
