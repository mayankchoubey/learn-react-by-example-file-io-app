import React from "react";
import FileError from "./FileError";
import FileDetails from "./FileDetails";
import FileDownload from "./FileDownload";
import UploadAnother from "./UploadAnother";

function MainDownload(props) {
  const [fileData, setFileData] = React.useState({
    fileFound: false,
    fileName: "",
    fileSize: "",
  });

  function clearFileData() {
    setFileData({ fileFound: false });
  }

  React.useEffect(() => {
    fetch(`api/files/${props.fileId}/meta`)
      .then((resp) => resp.json())
      .then((json) => setFileData({ ...json, fileFound: true }))
      .catch(() => {
        setFileData({ fileFound: false });
      });
  }, [props.fileId]);

  return (
    <main role="main" className="container mt-5">
      <div className="text-center">
        <h3 id="fileHeading">Download file</h3>
        <br />
        {fileData.fileFound === false && <FileError />}
        {fileData.fileFound && (
          <FileDetails
            fileName={fileData.fileName}
            fileSize={fileData.fileSize}
          />
        )}
        {fileData.fileFound && (
          <FileDownload
            fileId={props.fileId}
            fileName={fileData.fileName}
            clearFileCb={clearFileData}
          />
        )}
        <UploadAnother />
      </div>
    </main>
  );
}

export default MainDownload;
