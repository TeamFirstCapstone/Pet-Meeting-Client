const base = require("./base");
const suburl = "worry";

const list = (offset, limit) => base.list(suburl, offset, limit);
const get = (wid) => base.get(suburl, wid);

const create = ({ text, title }) => base.create(suburl, { text, title });

const update = (wid, { text, title }) =>
  base.update(wid, suburl, { text, title });

const remove = (wid) => base.remove(suburl, wid);

// ------------------- Comment ------------------

const comUrl = `${suburl}/comment`;

const listComment = (wid, offset, limit) =>
  base.list(`/${comUrl}s/${wid}`, offset, limit);

const getComment = (cid) => base.get(comUrl, cid);
const createComment = ({ text, wid }) => base.create(comUrl, { text, wid });
const updateComment = (cid, text) => base.update(cid, comUrl, { text });
const removeComment = (cid) => base.remove(comUrl, cid);

// ------------------- Bookmark ------------------

const bookUrl = `${suburl}/bookmark`;

const isbookmarked = (wid) => base.get(bookUrl, wid);
const bookmark = (wid) => base.create(`${bookUrl}/${wid}`); // body가 없다.

module.exports = {
  ...{ list, get, create, update, remove },
  ...{ listComment, getComment, createComment, updateComment, removeComment },
  ...{ isbookmarked, bookmark },
};
