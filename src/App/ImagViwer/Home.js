import React from "react";
import img from "./Assest/IMg/pic.jpg";
import img2 from "./Assest/IMg/A.jpg";
import img3 from "./Assest/IMg/C.jpg";
import pdf from "./Assest/Pdf/node.pdf";
import { useNavigate } from "react-router-dom";
import pdfImages from "./Assest/Pdf/pdf.png";
function SimpleImageViewer() {
  const navigate = useNavigate();
  const data = [img, img2, img3, pdf];
  const handleImageClick = (item) => {
    console.log("item", item);
    navigate("image", { state: item });
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {data.map((item, index) => {
        if (item.endsWith(".pdf")) {
          // If it's a PDF file, render a link to it
          return (
            <div key={index}>
              <img
                src={pdfImages}
                alt={`Image ${index + 1}`}
                style={{
                  width: 200,
                  height: 200,
                  margin: 10,
                }}
                onClick={() => handleImageClick(item)}
              />
              <a href={item} target="_blank" rel="noopener noreferrer">
                PDF {index + 1}
              </a>
            </div>
          );
        } else {
          // If it's an image, render an img element
          return (
            <div key={index}>
              <img
                src={item}
                alt={`Image ${index + 1}`}
                style={{
                  width: 200,
                  height: 200,
                  margin: 10,
                }}
                onClick={() => handleImageClick(item)}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default SimpleImageViewer;
