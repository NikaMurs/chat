/* eslint-disable no-undef */
import "moment/locale/ru";

if (localStorage.userActive) {
  const container = document.querySelector(".container");
  container.insertAdjacentHTML("beforeend", chatHTML());

  const chat = container.querySelector(".chat");
  const chatUsers = chat.querySelector(".chatUsers");
  const msgSendInput = chat.querySelector(".msgSendInput");
  const msgSend = chat.querySelector(".msgSend");
  const moment = require("moment");

  const ws = new WebSocket("ws://chatbackend-nl2s.onrender.com/ws");

  ws.addEventListener("message", (e) => {
    const data = JSON.parse(e.data);
    console.log(data);
    let isDone = false;

    if (Array.isArray(data)) {
      data.forEach((item) => {
        newMsg(item);
        isDone = true;
      });
    }

    if (data.activeUsers) {
      data.activeUsers.forEach((item) => {
        newUser(item);
        isDone = true;
      });
    }

    if (data.oldUser) {
      chatUsers.querySelector(`#${data.oldUser}`).remove();
      isDone = true;
    }

    if (!isDone) {
      newMsg(data);
    }
  });

  msgSend.addEventListener("submit", (e) => {
    e.preventDefault();
    if (msgSendInput.value.trim()) {
      const msg = {
        sender: localStorage.getItem("userActive"),
        msg: msgSendInput.value.trim(),
        date: moment().format("LT") + " " + moment().format("L"),
      };
      ws.send(JSON.stringify(msg));
      msgSendInput.value = "";
    }
  });

  const buttonExit = document.querySelector(".buttonExit");
  buttonExit.addEventListener("click", () => {
    const reason = {
      user: localStorage.userActive,
    };
    ws.close(1000, JSON.stringify(reason));
    delete localStorage.userActive;
    location.reload();
  });
}

function newMsg(msg) {
  let chatClass;
  if (msg.sender == localStorage.userActive) {
    chatClass = "chatMsg chatMsgYou";
    msg.sender = "You";
  } else {
    chatClass = "chatMsg";
  }
  document.querySelector(".chatMsgs").insertAdjacentHTML(
    "beforeend",
    `
    <div class="${chatClass}">
        <p class="msgTitle">${msg.sender} ${msg.date}</p>
        <p class="msgContent">${msg.msg}</p>
    </div>
    `
  );
}

function newUser(user) {
  let userClass;
  if (user == localStorage.userActive) {
    userClass = "chatUser chatUserYou";
    user = "You";
  } else {
    userClass = "chatUser";
  }
  document.querySelector(".chatUsers").insertAdjacentHTML(
    "beforeend",
    `
    <div class="${userClass}" id="${user}">${user}</div>
    `
  );
}

function chatHTML() {
  return `
    <button class="buttonExit">Exit</button>
    <div class="chatWrapper">
      <div class="chat">
        <div class="chatUsers">
        </div>
        <div class="chatMsgsWrapper">
          <div class="chatMsgs">
          </div>
          <form class="msgSend">
            <input class="msgSendInput" type="text">
            <button class="msgSendButton">Send</button>
          </form>
        </div>
      </div>
    </div>
    `;
}
