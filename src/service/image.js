const { BASE_URL } = require("../config/url");

// 모든 것은 ImgUrl로 정한다!

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

const addImage = (item) =>
  downloadWithImgId(item.ImgID).then((ImgUrl) => {
    item.ImgUrl = ImgUrl;
    return item;
  });

const addImages = (items) => {
  const ImgIDs = items.map((item) => item.ImgID);

  return downloadAllwithImgIds(ImgIDs).then((ImgUrls) => {
    ImgUrls.forEach((ImgUrl, idx) => (items[idx].ImgUrl = ImgUrl));
    return items;
  });
};

module.exports = {
  downloadWithFilename,
  downloadWithImgId,
  downloadAllwithImgIds,
  addImage,
  addImages,
};
