import React, { useState, useRef } from "react";
import './DragDownComponent.css';

const DragDownComponent = ({DraggedImage,setDraggedImage}) => {
  const [images, setImages] = useState([]);
  const dropRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log(images);
      setDraggedImage([reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const url = e.clipboardData.getData("text/plain");
    // setImages([...images, url]);
  };

  const handleCopy = (e, url) => {
    e.preventDefault();
    e.clipboardData.setData("text/plain", url);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={dropRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onPaste={handlePaste}
     className="DragDropComponent"
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          draggable
          onDragStart={(e) => handleCopy(e, img)}
          alt="upload"
        />
      ))}
    </div>
  );
}

export default DragDownComponent;
