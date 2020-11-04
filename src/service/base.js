const { BASE_URL } = require("../config/url");
const { downloadWithImgId, downloadAllwithImgIds } = require("./image");

const method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

function fetchWithMethod(url, type, body) {
  var option;
  if (type === method.GET)
    option = {
      method: "GET",
    };
  else if (type === method.POST)
    option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
  else if (type === method.PUT)
    option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
  else if (type === method.PUT)
    option = {
      method: "DELETE",
    };
  else throw new Error("Method type Error");

  return fetch(BASE_URL + url, option).then((res) => res.json());
}

// header를 form-data로 안했다
function fetchWithImage(url, type, body, file) {
  var formData = new FormData();
  Object.keys(body).forEach((item) => formData.append(item, formData[item]));
  formData.append("img", file);

  var option = { body: JSON.stringify(formData) };

  if (type === method.POST) option.method = "POST";
  else if (type === method.PUT) option.method = "PUT";
  else throw new Error("Method type Error");

  return fetch(BASE_URL + url, option).then((res) => res.json());
}

// ---------------------------------

const list = (url, offset, limit) => {
  const fullUrl = `/${url}?limit=${limit}&offset=${offset}`;
  return fetchWithMethod(fullUrl, method.GET).then((json) => json.result);
};

const get = (suburl, id) =>
  fetchWithMethod(`/${suburl}/${id}`, method.GET).then((json) => json.result);

const create = (suburl, body) =>
  fetchWithMethod(`/${suburl}`, method.POST, body).then((json) => json.result);

const update = (suburl, id, body) =>
  fetchWithMethod(`/${suburl}/${id}`, method.PUT, body).then(
    (json) => json.result
  );

// `Delete` is a keyword of Javascript
const remove = (suburl, id) =>
  fetchWithMethod(`/${suburl}/${id}`, method.DELETE).then(
    (json) => json.result
  );

// ---------------------------------

const addImage = (item) => {
  downloadWithImgId(item.ImgID).then((imgUrl) => {
    item.imgUrl = imgUrl;
    return item;
  });
};

const addImages = (items) => {
  const imgIds = items.map((item) => item.ImgID);

  return downloadAllwithImgIds(imgIds).then((imgUrls) => {
    imgUrls.forEach((imgUrl, idx) => (items[idx].imgUrl = imgUrl));
    return items;
  });
};

module.exports = {
  method,
  fetchWithMethod,
  fetchWithImage,
  list,
  get,
  create,
  update,
  remove,
  addImage,
  addImages,
};
