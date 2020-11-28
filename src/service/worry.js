import * as base from "./base";
const suburl = "worry";

export const list = (offset, limit) => base.list(suburl, offset, limit);
export const get = (wid) => base.get(suburl, wid);

export const create = ({ text, title }) => base.create(suburl, { text, title });

export const update = (wid, { text, title }) =>
  base.update(wid, suburl, { text, title });

export const remove = (wid) => base.remove(suburl, wid);

// ------------------- Comment ------------------

export const comUrl = `${suburl}/comment`;

export const listComment = (wid, offset, limit) =>
  base.list(`/${comUrl}s/${wid}`, offset, limit);

export const getComment = (cid) => base.get(comUrl, cid);
export const createComment = ({ text, wid }) =>
  base.create(comUrl, { text, wid });
export const updateComment = (cid, text) => base.update(cid, comUrl, { text });
export const removeComment = (cid) => base.remove(comUrl, cid);

// ------------------- Bookmark ------------------

export const bookUrl = `${suburl}/bookmark`;

export const isbookmarked = (wid) => base.get(bookUrl, wid);
export const bookmark = (wid) => base.create(`${bookUrl}/${wid}`); // body가 없다.
