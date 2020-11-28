import config from "../config";

export const method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export function fetchBase(url, option) {
  return fetch(url, option).then(async (res) => {
    if (res.ok) return res.json();
    else throw await res.json().then((error) => error.message);
  });
}

export function fetchWithMethod(url, type, body) {
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
  return fetchBase(config.BASE_URL + url, option);
}

// header를 form-data로 안했다
export function fetchWithImage(url, type, body, file) {
  var formData = new FormData();
  for (const name in body) formData.append(name, body[name]);
  formData.append("img", file, file.name);

  var option = { body: formData };

  if (type === method.POST) option.method = "POST";
  else if (type === method.PUT) option.method = "PUT";
  else throw new Error("Method type Error");

  return fetchBase(config.BASE_URL + url, option);
}

// ---------------------------------

export const list = (url, offset, limit) => {
  const fullUrl = `${url}?limit=${limit}&offset=${offset}`;
  return fetchWithMethod(fullUrl, method.GET).then((json) => json.result);
};

export const get = (suburl, id) =>
  fetchWithMethod(`${suburl}/${id}`, method.GET).then((json) => {
    console.log(json);
    return json.result;
  });

export const create = (suburl, body) =>
  fetchWithMethod(`${suburl}`, method.POST, body).then((json) => json.result);

export const update = (suburl, id, body) =>
  fetchWithMethod(`${suburl}/${id}`, method.PUT, body).then(
    (json) => json.result
  );

// `Delete` is a keyword of Javascript
export const remove = (suburl, id) =>
  fetchWithMethod(`${suburl}/${id}`, method.DELETE).then((json) => json.result);

// ---------------------------------
