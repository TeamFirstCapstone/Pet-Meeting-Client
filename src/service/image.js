const { BASE_URL } = require("../config/url");

// 모든 것은 imgUrl로 정한다!

function downloadWithFilename(filename) {
  return fetch(`${BASE_URL}/download?filename=${filename}`)
    .then((res) => res.blob())
    .then((blob) => window.URL.createObjectURL(blob));
}

function downloadWithImgId(imgId) {
  return fetch(`${BASE_URL}/download?imgid=${imgId}`)
    .then((res) => res.blob())
    .then((blob) => window.URL.createObjectURL(blob));
}

function downloadAllwithImgIds(imgIds) {
  return Promise.all(imgIds.map((imgId) => downloadWithImgId(imgId)));
}

module.exports = {
  downloadWithFilename,
  downloadWithImgId,
  downloadAllwithImgIds,
};
