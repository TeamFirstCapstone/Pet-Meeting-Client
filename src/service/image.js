import config from "../config";

// 모든 것은 ImgUrl로 정한다!

export function downloadWithFilename(filename) {
  return fetch(`${config.BASE_URL}/download?filename=${filename}`)
    .then((res) => res.blob())
    .then((blob) => window.URL.createObjectURL(blob));
}

export function downloadWithImgId(imgId) {
  return fetch(`${config.BASE_URL}/download?imgid=${imgId}`)
    .then((res) => res.blob())
    .then((blob) => window.URL.createObjectURL(blob));
}

export function downloadAllwithImgIds(imgIds) {
  return Promise.all(imgIds.map((imgId) => downloadWithImgId(imgId)));
}

export const addImage = (item) =>
  downloadWithImgId(item.ImgID).then((ImgUrl) => {
    item.ImgUrl = ImgUrl;
    return item;
  });

export const addImages = (items) => {
  const ImgIDs = items.map((item) => item.ImgID);

  return downloadAllwithImgIds(ImgIDs).then((ImgUrls) => {
    ImgUrls.forEach((ImgUrl, idx) => (items[idx].ImgUrl = ImgUrl));
    return items;
  });
};
