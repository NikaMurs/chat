/* eslint-disable no-undef */
const http = require("http");
const Koa = require("koa");
const { koaBody } = require("koa-body");
const WS = require("ws");
const chat = require("./db/index");

const router = require("./routes");

const app = new Koa();

app.use(
  koaBody({
    urlencoded: true,
    multipart: true,
  })
);

app.use((ctx, next) => {
  ctx.response.set("Access-Control-Allow-Origin", "*");
  ctx.response.set("Access-Control-Allow-Headers", "*");
  next();
});

app.use((ctx, next) => {
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 200;
  }
  next();
});

app.use(router());

const port = 7070;
const server = http.createServer(app.callback());

const wsServer = new WS.Server({
  server,
});

wsServer.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const eventData = JSON.parse(msg);
    if (!eventData.newUser) {
      chat.newMessage(JSON.parse(msg));
    }
    if (!chat.users.includes(eventData.newUser)) {
      chat.newUser(eventData.newUser);
    }

    Array.from(wsServer.clients)
      .filter((client) => client.readyState === WS.OPEN)
      .forEach((client) => client.send(JSON.stringify(eventData)));
  });

  ws.send(JSON.stringify(chat.activeUsers()));
  ws.send(JSON.stringify(chat.chat));

  ws.on("close", (code, reason) => {
    if (code == 1000) {
      const noActiveUser = {
        oldUser: JSON.parse(reason).user,
      };

      const eventData = JSON.stringify(noActiveUser);
      Array.from(wsServer.clients)
        .filter((client) => client.readyState === WS.OPEN)
        .forEach((client) => client.send(eventData));

      chat.deleteUser(JSON.parse(reason).user);
    }
  });
});

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is listening to " + port);
});
