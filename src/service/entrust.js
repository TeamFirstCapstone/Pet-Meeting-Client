const { addImages } = require("./image");
const base = require("./base");
const { method, fetchWithMethod } = base;
const suburl = "entrust";

const list = (offset, limit) => base.list(suburl, offset, limit);
const get = (eid) => base.get(suburl, eid);

const create = ({
  text,
  startDate,
  endDate,
  toyPayment,
  cityId,
  housings,
  pets,
}) =>
  base.create(suburl, {
    ...{ text, startDate, endDate },
    ...{ toyPayment, cityId, housings, pets }, // 그냥 보기 좋게 하려고...
  });

const update = (
  eid,
  { text, startDate, endDate, toyPayment, cityId, housings, pets }
) =>
  base.update(suburl, eid, {
    ...{ text, startDate, endDate },
    ...{ toyPayment, cityId, housings, pets }, // 그냥 보기 좋게 하려고...
  });

const remove = (eid) => base.remove(suburl, eid);

// -------------------------------------

// 각 option별 정보가 담겨 있다.
const info = () =>
  fetchWithMethod(`${suburl}/info`, method.GET).then((json) => json.result);

const pets = (offset, limit) =>
  base.list(`${suburl}/pets`, offset, limit).then((pets) => addImages(pets));

module.exports = {
  list,
  get,
  remove,
  create,
  update,
  info,
  pets,
};
