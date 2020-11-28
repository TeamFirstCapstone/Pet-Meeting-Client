import * as base from "./base";
const suburl = "raise";

export const get = (rid) => base.get(suburl, rid);
export const remove = (rid) => base.remove(suburl, rid);

export const create = ({
  motivation,
  carrierPeriod,
  housingId,
  eid,
  cityId,
}) => {
  const body = { motivation, carrierPeriod, housingId, eid, cityId };
  return base.create(suburl, body);
};

export const update = (
  rid,
  { motivation, carrierPeriod, housingId, cityId }
) => {
  const body = { motivation, carrierPeriod, housingId, cityId };
  return base.update(suburl, rid, body);
};
