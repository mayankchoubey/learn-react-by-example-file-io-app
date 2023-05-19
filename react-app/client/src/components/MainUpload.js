import React from "react";
import FileInfo from "./FileInfo";
import FileUpload from "./FileUpload";
import UploadAnother from "./UploadAnother";

function MainUpload() {
  const [uploadData, setUploadData] = React.useState({
    fileUploaded: false,
  });

  function uploadDone(fileData) {
    setUploadData({ ...fileData, fileUploaded: true });
  }

  return (
    <main role="main" className="container mt-5">
      <div className="text-center">
        {uploadData.fileUploaded === false && (
          <FileUpload uploadDoneCb={uploadDone} />
        )}
        {uploadData.fileUploaded === true && <FileInfo fileInfo={uploadData} />}
        {uploadData.fileUploaded === true && <UploadAnother />}
      </div>
    </main>
  );
}

export default MainUpload;
