const { BASE_URL } = require("../config/url");

function download(filename) {
  return fetch(`${BASE_URL}/download/${filename}`)
    .then((res) => res.blob())
    .then((blob) => window.URL.createObjectURL(blob));
}

module.exports = {
  download: download,
};
