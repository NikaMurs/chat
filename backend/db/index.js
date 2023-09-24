/* eslint-disable no-undef */
const chat = {
  chat: [
    {
      sender: "Ivan",
      msg: "Привет",
      date: "21.09.2023 20:58",
    },
    {
      sender: "Oleg",
      msg: "И тебе тоже привет",
      date: "21.09.2023 20:59",
    },
    {
      sender: "NikaMurs",
      msg: "Мое сообщение",
      date: "21.09.2023 22:58",
    },
  ],
  users: ["Oleg", "Ivan"],

  newUser(user) {
    this.users.push(user);
  },

  deleteUser(user) {
    let index = this.users.indexOf(user);
    if (index > 0) {
      this.users.splice(index, 1);
    }
  },

  newMessage(msg) {
    this.chat.push(msg);
  },

  activeUsers() {
    return {
      activeUsers: this.users,
    };
  },
};

module.exports = chat;
