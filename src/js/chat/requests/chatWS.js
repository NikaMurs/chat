/* eslint-disable no-undef */
import "moment/locale/ru";

if (sessionStorage.userActive) {
  const container = document.querySelector(".container");
  container.insertAdjacentHTML("beforeend", chatHTML());

  const chat = container.querySelector(".chat");
  const chatUsers = chat.querySelector(".chatUsers");
  const msgSendInput = chat.querySelector(".msgSendInput");
  const msgSend = chat.querySelector(".msgSend");
  const moment = require("moment");

  const ws = new WebSocket("wss://chatbackend-nl2s.onrender.com/ws");
  //const ws = new WebSocket("ws://localhost:7070/ws");

  ws.addEventListener("open", () => {
    const obj = {
      newUser: sessionStorage.userActive,
    };
    ws.send(JSON.stringify(obj));
  });

  ws.addEventListener("message", (e) => {
    const data = JSON.parse(e.data);
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
      try {
        chatUsers.querySelector(`#${data.oldUser}`).remove();
      } catch (error) {
        console.log(error);
      }
      isDone = true;
    }

    if (data.newUser) {
      isDone = true;
      if (data.newUser != sessionStorage.userActive) {
        if (!chatUsers.querySelector(`#${data.newUser}`)) {
          newUser(data.newUser);
        }
      }
    }

    if (!isDone) {
      newMsg(data);
    }
  });

  msgSend.addEventListener("submit", (e) => {
    e.preventDefault();
    if (msgSendInput.value.trim()) {
      const msg = {
        sender: sessionStorage.getItem("userActive"),
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
      user: sessionStorage.userActive,
    };
    ws.close(1000, JSON.stringify(reason));
    delete sessionStorage.userActive;
    location.reload();
  });

  window.addEventListener("beforeunload", () => {
    const reason = {
      user: sessionStorage.userActive,
    };
    ws.close(1000, JSON.stringify(reason));
  });
}

function newMsg(msg) {
  let chatClass;
  if (msg.sender == sessionStorage.userActive) {
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
  document.querySelector(".chatMsgsWrapper").scrollTop = 9999;
}

function newUser(user) {
  if (sessionStorage.userActive == user) return;
  document.querySelector(".chatUsers").insertAdjacentHTML(
    "beforeend",
    `
    <div class="chatUser" id="${user}">${user}</div>
    `
  );
}

function chatHTML() {
  return `
    <button class="buttonExit">Exit</button>
    <div class="chatWrapper">
      <div class="chat">
        <div class="chatUsers">
          <div class="chatUser chatUserYou" id="${sessionStorage.userActive}">You</div>
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
