const user = require("./user");
const showoff = require("./showoff");
const entrust = require("./entrust");
const worry = require("./worry");
const raise = require("./raise");
// const image = require("./image");

// image가 굳이 밖으로 나가야 할까??
const api = { user, showoff, entrust, worry, raise };

module.exports = api;
