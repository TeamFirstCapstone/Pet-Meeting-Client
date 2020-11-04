const { addImages, addImage } = require("./base");
const base = require("./base");
const { method, fetchWithMethod, fetchWithImage } = base;
const suburl = "showoff";

const list = (offset, limit) =>
  base.list(suburl, offset, limit).then((showoffs) => addImages(showoffs));

const get = (sid) => base.get(suburl, sid).then((showoff) => addImage(showoff));
const remove = (sid) => base.remove(suburl, sid);

const best = () =>
  fetchWithMethod(`/${suburl}/best`, method.GET)
    .then((json) => json.result)
    .then((showoff) => addImage(showoff));

const create = (text, file) =>
  fetchWithImage(`/${suburl}`, method.POST, { text }, file).then(
    (json) => json.result
  );

const update = (sid, text, file) =>
  fetchWithImage(`/${suburl}/${sid}`, method.PUT, { text }, file).then(
    (json) => json.result
  );

// -------------------------------------

const voted = (sid) =>
  fetchWithMethod(`/${suburl}/voted/${sid}`, method.GET).then(
    (json) => json.result
  );

const vote = (sid) =>
  fetchWithMethod(`/${suburl}/vote/${sid}`, method.GET).then(
    (json) => json.result
  );

module.exports = {
  list,
  get,
  remove,
  best,
  create,
  update,
  voted,
  vote,
};
