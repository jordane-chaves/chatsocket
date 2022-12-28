import { User } from "../dtos/User";

export function addToContactList(user: User) {
  const contactsList = document.getElementById('contacts_list')!;

  contactsList.innerHTML += `
  <li
    class="contact"
    id="user_${user.id}"
    data-id-user="${user.id}"
  >

    <div class="avatar">
      <img src="${user.avatar}" alt="User Avatar">
    </div>

    <div class="info">
      <span class="contact_name">${user.name}</span>
      <span class="last_message"></span>
    </div>
  </li>
  `;
}
