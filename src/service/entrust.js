import { addImages } from "./image";
import * as base from "./base";
const { method, fetchWithMethod } = base;
const suburl = "entrust";

export const list = (offset, limit) => base.list(suburl, offset, limit);
export const get = (eid) => base.get(suburl, eid);

//js object
// const payload = { start, end }

// const doSomething = ({ start }) => { start, end };

// doSomething(payload);

// const doSomthing = ([a, b]) => a + b;

// doSomething([1, 2]);

export const create = ({
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

export const update = (
  eid,
  { text, startDate, endDate, toyPayment, cityId, housings, pets }
) =>
  base.update(suburl, eid, {
    ...{ text, startDate, endDate },
    ...{ toyPayment, cityId, housings, pets }, // 그냥 보기 좋게 하려고...
  });

export const remove = (eid) => base.remove(suburl, eid);

// -------------------------------------

// 각 option별 정보가 담겨 있다.
export const info = () =>
  fetchWithMethod(`${suburl}/info`, method.GET).then((json) => json.result);

export const pets = (offset, limit) =>
  base
    .list(`${suburl}/pets`, offset, limit)
    .then((result) => addImages(result));
