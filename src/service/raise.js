const base = require("./base");

const suburl = "raise";

const get = (rid) => base.get(suburl, rid);
const remove = (rid) => base.remove(suburl, rid);

const create = ({ motivation, carrierPeriod, housingId, eid, cityId }) => {
  const body = { motivation, carrierPeriod, housingId, eid, cityId };
  return base.create(suburl, body);
};

const update = (rid, { motivation, carrierPeriod, housingId, cityId }) => {
  const body = { motivation, carrierPeriod, housingId, cityId };
  return base.update(suburl, rid, body);
};

module.exports = {
  get,
  create,
  update,
  remove,
};
