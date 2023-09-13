import React, { useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import img from "./Assest/IMg/pic.jpg";
import img2 from "./Assest/IMg/A.jpg";
import img3 from "./Assest/IMg/C.jpg";
import pdf from "./Assest/Pdf/node.pdf";
import "./ImageViewer.css"; 
import { Document, Page } from 'react-pdf';

function ImageViwer() {
  const images = [img, img2, img3];

  console.log(pdf);

  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const openImageViewer = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  const closeImageViewer = () => {
    setIsOpen(false);
    setCurrentImage(0);
  };

  return (
    <div>
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          onClick={() => openImageViewer(index)}
          style={{
            cursor: "pointer",
            width: 100,
            height: 100,
            imageResolution: "inherit",
            margin: 10,
          }}
        />
      ))}

      {isOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          leftArrowComponent={() => null}
          rightArrowComponent={() => null}
          disableScroll={true}
        />
      )}
    </div>
  );
}

export default ImageViwer;
