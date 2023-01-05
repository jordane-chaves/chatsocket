interface SelectedUserData {
  selectedUser: HTMLLIElement;
}

export function setSelectedUserInfo(data: SelectedUserData) {
  const { selectedUser } = data;

  const contactName = selectedUser.querySelector(
    ".info .contact_name"
  )?.innerHTML;
  const contactAvatar = selectedUser
    .querySelector(".avatar img")
    ?.getAttribute("src");

  const messagesHeader = document.getElementById('messages_header')!;

  messagesHeader.innerHTML = `
  <img class="avatar" src="${contactAvatar}" alt="Avatar ${contactName}">

  <div class="info">
    <span class="contact_name">${contactName}</span>
    <span class="description"></span>
  </div>
  `;
}
