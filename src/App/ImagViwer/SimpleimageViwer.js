import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "./Assest/Pdf/node.pdf";
import ImageViewer from "react-simple-image-viewer";

function SimpleImageViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const navigation = useNavigate();
  const location = useLocation();
  const passedData = location.state;
  const image = passedData.split(".").pop();
  let data = [];

  if (passedData) {
    data.push(passedData);
  }
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  useEffect(() => {
    if (passedData) {
      setNumPages(1);
    }
  }, [passedData]);

  const closeImageViewer = () => {
    navigation("/");
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <h1
        style={{ position: "absolute", top: 0, left: 10, cursor: "pointer" }}
        onClick={() => {
          navigation("/");
        }}
      >
        close
      </h1>
      {image == "pdf" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "700px", border: "3px solid grey" }}>
            {image === "pdf" ? (
              <Document file={passedData} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={index} pageNumber={index + 1} />
                ))}
              </Document>
            ) : (
              <p>Unsupported file format</p>
            )}
          </div>
        </div>
      ) : (
        <ImageViewer
          src={data}
          // currentIndex={currentImage}
          onClose={closeImageViewer}
          leftArrowComponent={() => null}
          rightArrowComponent={() => null}
          disableScroll={true}
        />
      )}
    </div>
  );
}

export default SimpleImageViewer;
