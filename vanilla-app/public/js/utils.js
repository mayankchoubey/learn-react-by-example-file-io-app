function getFileSize(size) {
  const sizeFormatter = new Intl.NumberFormat([], {
    style: "unit",
    unit: "byte",
    notation: "compact",
    unitDisplay: "narrow",
  });
  return sizeFormatter.format(size);
}

function hideElem(id) {
  document.getElementById(id).style.display = "none";
}

function showElem(id) {
  document.getElementById(id).style.display = "block";
}

function setHTML(id, val) {
  document.getElementById(id).innerHTML = val;
}

function getHTML(id) {
  return document.getElementById(id).innerHTML;
}

function clearHTML(id) {
  document.getElementById(id).innerHTML = "";
}

function getLink(link) {
  return `<a href="${link}" target="_">${link}</a>`;
}

function addClass(id, cl) {
  document.getElementById(id).classList.add(cl);
}

function removeClass(id, cl) {
  document.getElementById(id).classList.remove(cl);
}
