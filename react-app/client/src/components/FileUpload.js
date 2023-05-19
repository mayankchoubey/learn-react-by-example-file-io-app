import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function FileUpload(props) {
  const uploadBtnRef = React.useRef();

  function uploadFile() {
    uploadBtnRef.current.click();
  }

  async function sendFile(e) {
    const file = e.target.files[0];
    const body = new FormData();
    body.set("uploadedFile", file, file.name);
    const resp = await fetch("api/files", {
      method: "PUT",
      body,
    });
    if (resp.status !== 200) {
      MySwal.fire({
        title: "Error!",
        text: "Unable to upload the file",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    const json = await resp.json();
    props.uploadDoneCb({
      fileName: file.name,
      fileSize: file.size,
      fileUrl: json.fileUrl,
    });
  }

  return (
    <div>
      <h3 id="fileHeading">Upload file</h3>
      <br />
      <input
        type="file"
        id="uploadBtn"
        className="uploadBtn"
        name="uploadedFile"
        onChange={sendFile}
        ref={uploadBtnRef}
        hidden
      />
      <input
        type="button"
        id="uploadBtnTemp"
        className="btn btn-primary uploadBtnTemp"
        value="Choose a file"
        onClick={uploadFile}
      />
    </div>
  );
}

export default FileUpload;
