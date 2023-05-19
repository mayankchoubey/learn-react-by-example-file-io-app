import "./FileAccess.css";
import QRCode from "react-qr-code";

function FileAccess(props) {
  return (
    <div className="container-sm bg-light p-3 file-access-container">
      <div className="row justify-content-between">
        <div className="col-sm">
          File URL: <br />
          <a href={props.fileUrl} id="fileUrl">{props.fileUrl}</a>
        </div>
        <div className="col-sm justify-content-md-left">
          <QRCode value={props.fileUrl} size={128} />
        </div>
      </div>
    </div>
  );
}

export default FileAccess;
