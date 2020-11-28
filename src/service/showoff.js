import { addImages, addImage } from "./image";
import * as base from "./base";
import { method, fetchWithMethod, fetchWithImage } from "./base";
const suburl = "showoff";

export const list = (offset, limit) =>
  base.list(suburl, offset, limit).then((showoffs) => addImages(showoffs));

export const get = (sid) =>
  base.get(suburl, sid).then((showoff) => addImage(showoff));
export const remove = (sid) => base.remove(suburl, sid);

export const best = () =>
  fetchWithMethod(`/${suburl}/best`, method.GET)
    .then((json) => json.result)
    .then((showoff) => addImage(showoff));

export const create = (text, file) =>
  fetchWithImage(`/${suburl}`, method.POST, { text }, file).then(
    (json) => json.result
  );

export const update = (sid, text, file) =>
  fetchWithImage(`/${suburl}/${sid}`, method.PUT, { text }, file).then(
    (json) => json.result
  );

// -------------------------------------

export const get_vote = (sid) =>
  fetchWithMethod(`/${suburl}/vote/${sid}`, method.GET).then(
    (json) => json.result
  );

export const set_vote = (sid, score) =>
  fetchWithMethod(`/${suburl}/vote/${sid}`, method.POST, { score }).then(
    (json) => json.result
  );
