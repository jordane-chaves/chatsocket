import { User } from "@application/users/entities/user";

export class UserViewModel {
  static toSocket(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      socketId: user.socketId,
    };
  }
}
