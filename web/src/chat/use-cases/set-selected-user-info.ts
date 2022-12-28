interface SelectedUserData {
  name: string;
  avatar: string;
}

export function setSelectedUserInfo(data: SelectedUserData) {
  const messagesHeader = document.getElementById('messages_header')!;

  messagesHeader.innerHTML = `
  <img class="avatar" src="${data.avatar}" alt="Avatar ${data.name}">

  <div class="info">
    <span class="contact_name">${data.name}</span>
    <span class="description">Typing...</span>
  </div>
  `;
}
