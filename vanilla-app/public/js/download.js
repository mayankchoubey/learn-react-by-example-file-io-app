function onOpen() {
  getFileDetails();
}

async function getFileDetails() {
  const qp = new URLSearchParams(window.location.search);
  const fileId = qp.get("fileId");
  if (!fileId) {
    fileNotFound();
  }
  const resp = await fetch(`api/files/${fileId}/meta`);
  if (resp.status === 200) {
    const json = await resp.json();
    fileFound(json);
  } else {
    fileNotFound();
  }
}

function fileNotFound() {
  hideElem("fileDetails");
  showElem("fileError");
  setHTML("fileError", "File doesn't exist");
  hideElem("downloadFile");
}

function fileFound(json) {
  showElem("fileName");
  showElem("fileSize");
  hideElem("fileError");
  setHTML("fileName", json.fileName);
  setHTML("fileSize", getFileSize(json.fileSize));
}

async function downloadFile() {
  const qp = new URLSearchParams(window.location.search);
  const fileId = qp.get("fileId");
  const resp = await fetch(`api/files/${fileId}`);
  const blobURL = URL.createObjectURL(await resp.blob());
  const a = document.createElement("a");
  a.href = blobURL;
  a.download = getHTML("fileName");
  a.style.display = "none";
  document.body.append(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(blobURL);
    a.remove();
    getFileDetails();
  }, 1000);
}
