import { useEffect, useRef, useState } from "react";
import "./FileDownload.css";

function FileDownload(props) {
  const dataLink = useRef();
  const [fileData, setFileData] = useState("");

  useEffect(() => {
    if (fileData) {
      dataLink.current.click();
      setTimeout(() => props.clearFileCb(), 1000);
    }
  }, [fileData]);

  async function buttonClick() {
    const resp = await fetch(`api/files/${props.fileId}`);
    const respBlob = await resp.blob();
    setFileData(URL.createObjectURL(respBlob));
  }

  return (
    <div className="container-sm download-container bg-light p-3">
      <a download={props.fileName} href={fileData} ref={dataLink}></a>
      <input
        type="button"
        className="btn btn-primary"
        value="Download file"
        onClick={buttonClick}
      />
    </div>
  );
}

export default FileDownload;
