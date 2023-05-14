function onOpen() {
  hideElem("fileDetails");
  hideElem("uploadAnother");
}

function uploadFile() {
  document.getElementById("uploadBtn").click();
}

async function sendFile(files) {
  hideElem("uploadBtnTemp");
  const file = files[0];
  const body = new FormData();
  body.set("uploadedFile", file, file.name);
  const resp = await fetch("api/files", {
    method: "PUT",
    body,
  });
  if (resp.status !== 200) {
    Swal.fire({
      title: "Error!",
      text: "Unable to upload the file",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }
  const json = await resp.json();
  setHTML("fileHeading", "File uploaded!");
  addClass("fileHeading", "text-success");
  showElem("fileDetails");
  setHTML("fileUrl", getLink(json.fileUrl));
  setHTML("fileName", file.name);
  clearHTML("qrcodeCont");
  new QRCode("qrcodeCont", {
    text: json.fileUrl,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
  });
  setHTML("fileSize", getFileSize(file.size));
  showElem("uploadAnother");
}
