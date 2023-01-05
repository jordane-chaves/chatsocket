import { Socket } from "socket.io-client";

import { Message } from "../../../pages/chat/dtos/Message";
import { User } from "../../../pages/chat/dtos/User";
import { addLastMessage } from "../../../pages/chat/utils/add-last-message";
import { addToContactList } from "../../../pages/chat/utils/add-to-contact-list";
import { AppLocalStorage } from "../../../storage/app-local-storage";

interface CreateUserRequest {
  name: string;
  email: string;
  avatar: string;
}

interface UserHandlerRequest {
  socket: Socket,
  user: CreateUserRequest
}

interface CreateUserResponse {
  user: User;
}

interface LastMessageResponse {
  message: Message | null;
}

export function userHandler(data: UserHandlerRequest) {
  const { socket, user } = data;
  const { avatar, email, name } = user;

  function listUsersCallback(users: User[]) {
    const userLogged = AppLocalStorage.getUserLogged();

    users.map((user) => {
      const userExistsInContactList = document.getElementById(
        `user_${user.id}`
      );

      const isUserLogged =
        user.email === email || user.email === userLogged?.email;

      if (!isUserLogged && !userExistsInContactList) {
        addToContactList({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          socketId: user.socketId,
        });

        socket.emit(
          "message:last",
          { userId: user.id },
          (data: LastMessageResponse) => {
            const { message } = data;

            if (message) {
              addLastMessage({ message, userId: user.id });
            }
          }
        );
      }
    });
  }

  function onNewUser(user: User) {
    const userExistsInContactList = document.getElementById(`user_${user.id}`);

    if (!userExistsInContactList) {
      addToContactList({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        socketId: user.socketId,
      });
    }
  }

  function createUserCallback(data: CreateUserResponse) {
    AppLocalStorage.setUserLogged(data.user);
  }

  socket.emit("users:create", { name, email, avatar }, createUserCallback);
  socket.emit("users:list", listUsersCallback);
  socket.on("users:new", onNewUser);
}
