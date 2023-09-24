/* eslint-disable no-undef */
const Router = require("koa-router");
const chat = require("../../db/index");

const router = new Router();

router.post("/registrationNewUser", (ctx) => {
  const { userNick } = ctx.request.body;
  if (chat.users.includes(userNick)) {
    ctx.response.status = 409;
  } else {
    chat.newUser(userNick);
    ctx.response.status = 200;
  }
});

module.exports = router;
