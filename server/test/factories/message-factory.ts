import { Message, MessageProps } from "../../src/application/messages/entities/message";

type Override = Partial<MessageProps>;

export function makeMessage(override: Override = {}) {
  return new Message({
    from: 'example-user-id',
    roomId: 'example-room-id',
    text: 'Olá, este é um exemplo de mensagem!',
    ...override,
  });
}
