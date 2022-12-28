interface UserLoggedInfoData {
  name: string;
  avatar: string;
}

export function setUserLoggedInfo(user: UserLoggedInfoData) {
  const userAvatar = document.getElementById('profile_avatar')!;

  userAvatar.setAttribute('src', user.avatar);
  userAvatar.setAttribute('title', user.name);
}
