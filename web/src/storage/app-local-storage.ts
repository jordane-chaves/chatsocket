import { User } from "../pages/chat/dtos/User";

export class AppLocalStorage {
  static setUserLogged(userLogged: User) {
    window.localStorage.setItem('userLogged', JSON.stringify(userLogged));
  }

  static getUserLogged(): User | null {
    const rawUser = window.localStorage.getItem('userLogged');

    if (!rawUser) {
      return null;
    }

    return JSON.parse(rawUser) as User;
  }

  static setRoomId(roomId: string) {
    window.localStorage.setItem('roomId', roomId);
  }

  static getRoomId(): string | null {
    return window.localStorage.getItem('roomId') ?? null;
  }
}
