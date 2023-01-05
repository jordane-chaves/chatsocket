import "../../styles/global.css";
import "../../styles/scrollbar.css";
import "./styles/style.css";
import "./styles/header.css";
import "./styles/contacts.css";
import "./styles/messages.css";
import "./styles/theme-button.css";

import "../../utils/theme-switcher";
import { setFakerData } from "./utils/faker-data";
import { setUserLoggedInfo } from "./utils/set-user-logged-info";
import { sendMessage } from "./utils/send-message";
import { setSelectedUserInfo } from "./utils/set-selected-user-info";
import { scrollToBottom } from "./utils/scroll-to-bottom";
import { socket } from "../../services/websocket";
import { AppLocalStorage } from "../../storage/app-local-storage";
import { userHandler } from "../../services/websocket/handlers/user-handler";
import { messageHandler } from "../../services/websocket/handlers/message-handler";
import { notificationHandler } from "../../services/websocket/handlers/notification-handler";
import { chatHandler } from "../../services/websocket/handlers/chat-handler";

window.onload = () => {
  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  const email = params.get("email");
  const avatar = params.get("avatar");

  if (!name || !email || !avatar) {
    if (import.meta.env.DEV) {
      setFakerData();
      scrollToBottom("messages");
    } else {
      window.location.replace("/");
    }
    return;
  }

  setUserLoggedInfo({ name, avatar });

  userHandler({
    socket,
    user: { avatar, email, name },
  });

  messageHandler(socket);
  notificationHandler(socket);
};

document.getElementById("contacts_list")!.addEventListener("click", (event) => {
  AppLocalStorage.setRoomId('');
  document.getElementById("messages")!.innerHTML = "";
  document
    .querySelectorAll(".contact")
    .forEach((contact) => contact.classList.remove("selected"));

  const clickedElement = event.target as HTMLLIElement;
  const messagesMain = document.querySelector(".content main")!;

  const isContactSelected =
    clickedElement && clickedElement.matches("li.contact");

  if (!isContactSelected) {
    messagesMain.classList.add("hidden");
    return;
  }

  messagesMain.classList.remove("hidden");
  clickedElement.classList.add("selected");

  document.querySelector<HTMLInputElement>("#user_message")!.focus();

  setSelectedUserInfo({ selectedUser: clickedElement });

  const contactId = clickedElement.getAttribute("data-id-user");

  if (!contactId) {
    return;
  }

  const notification = document.querySelector(
    `#user_${contactId} .notification`
  );

  if (notification) {
    notification.remove();
  }

  chatHandler({ socket, userId: contactId });
});

document
  .querySelector<HTMLFormElement>("main > footer > form")!
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const inputMessage = document.getElementById(
      "user_message"
    )! as HTMLInputElement;

    const message = inputMessage.value;

    inputMessage.value = "";

    sendMessage(message, socket);
  });

document.getElementById("user_message")!.addEventListener("input", () => {
  const roomId = AppLocalStorage.getRoomId();

  socket.emit("message:typing", { roomId });
});
