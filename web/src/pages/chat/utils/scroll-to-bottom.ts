export function scrollToBottom(id: string) {
  const element = document.getElementById(id);

  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}
