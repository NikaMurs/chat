/* eslint-disable no-undef */
const combineRouters = require("koa-combine-routers");
const registration = require("./registration");

const router = combineRouters(registration);

module.exports = router;
