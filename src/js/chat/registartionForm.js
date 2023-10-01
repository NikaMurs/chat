const registration = document.querySelector(".registrationWrapper");
const registrationInput = registration.querySelector(".registrationInput");
const registrationButton = registration.querySelector(".registrationButton");

import registrationNewUser from "./requests/registrationNewUser.js";

if (sessionStorage.userActive) {
  registration.remove();
} else {
  registrationButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (registrationInput.value.trim()) {
      const user = {
        userNick: registrationInput.value.trim(),
      };
      const res = await registrationNewUser(user);
      if (res.status == 200) {
        sessionStorage.setItem("userActive", user.userNick);
        location.reload();
      } else {
        registrationInput.value = "";
        registrationInput.placeholder = "Данный ник уже занят";
      }
    }
  });
}
