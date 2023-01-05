import 'dayjs/locale/pt-br';
import dayjs from "dayjs";

interface AddMessageDateRequest {
  date: Date;
}

export function addMessageDate({ date }: AddMessageDateRequest) {
  const messagesDiv = document.getElementById('messages')!;
  const messageDay = dayjs(date).get('D');
  const currentDay = dayjs().get('D');

  let message = dayjs(date)
    .locale('pt-br')
    .format('DD [de] MMMM [de] YYYY')
    .toLowerCase();

  if (messageDay === currentDay) {
    message = 'Hoje';
  }

  if (messageDay === currentDay -1) {
    message = 'Ontem';
  }

  messagesDiv.innerHTML += `
    <div class="message-date">
      <span>${message}</span>
    </div>
  `;
}
