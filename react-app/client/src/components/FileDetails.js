import "./FileDetails.css";

function FileDetails(props) {
  function getFileSize(size) {
    const sizeFormatter = new Intl.NumberFormat([], {
      style: "unit",
      unit: "byte",
      notation: "compact",
      unitDisplay: "narrow",
    });
    return sizeFormatter.format(size);
  }

  return (
    <div className="container-sm bg-light p-3 file-details-container">
      <div className="row justify-content-between">
        <div className="col-sm">
          File Name: <br />
          <b>
            <span id="fileName">{props.fileName}</span>
          </b>
        </div>
        <div className="col-sm">
          File Size: <br />
          <b>
            <span id="fileSize">{getFileSize(props.fileSize)}</span>
          </b>
        </div>
      </div>
    </div>
  );
}

export default FileDetails;
