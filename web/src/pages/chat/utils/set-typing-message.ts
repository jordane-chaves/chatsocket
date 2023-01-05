export function setTypingMessage() {
  const seconds = 2 * 1000;

  const selectedUserDescription = document
    .querySelector('#messages_header .description')!;

  if (selectedUserDescription) {
    selectedUserDescription.innerHTML = 'Typing...';

    setTimeout(() => {
      selectedUserDescription.innerHTML = '';
    }, seconds);
  }
}
