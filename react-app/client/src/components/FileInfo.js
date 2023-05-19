import FileAccess from "./FileAccess";
import FileDetails from "./FileDetails";

function FileInfo(props) {
  const { fileName, fileSize, fileUrl } = props.fileInfo;

  return (
    <div>
      <h3 className="fileHeading text-success">File Uploaded!</h3>
      <FileDetails fileName={fileName} fileSize={fileSize} />
      <FileAccess fileUrl={fileUrl} />
    </div>
  );
}

export default FileInfo;
