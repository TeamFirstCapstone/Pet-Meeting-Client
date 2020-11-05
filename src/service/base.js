const { BASE_URL } = require("../config/url");

const method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

function fetchBase(url, option) {
  return fetch(url, option).then(async (res) => {
    if (res.ok) return res.json();
    else {
      if (res.status === 400)
        throw await res.json().then((error) => error.message);
      else; // TODO
    }
  });
}

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

  if (url[0] !== "/") url = "/" + url;
  return fetchBase(BASE_URL + url, option);
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

  return fetchBase(BASE_URL + url, option);
}

// ---------------------------------

const list = (url, offset, limit) => {
  const fullUrl = `${url}?limit=${limit}&offset=${offset}`;
  return fetchWithMethod(fullUrl, method.GET).then((json) => json.result);
};

const get = (suburl, id) =>
  fetchWithMethod(`${suburl}/${id}`, method.GET).then((json) => json.result);

const create = (suburl, body) =>
  fetchWithMethod(`${suburl}`, method.POST, body).then((json) => json.result);

const update = (suburl, id, body) =>
  fetchWithMethod(`${suburl}/${id}`, method.PUT, body).then(
    (json) => json.result
  );

// `Delete` is a keyword of Javascript
const remove = (suburl, id) =>
  fetchWithMethod(`${suburl}/${id}`, method.DELETE).then((json) => json.result);

// ---------------------------------

module.exports = {
  method,
  fetchWithMethod,
  fetchWithImage,
  list,
  get,
  create,
  update,
  remove,
};
