import { Message } from "./message";

describe('Message', () => {
  it('should be able to create a message', () => {
    const message = new Message({
      from: 'example-user-id',
      roomId: 'example-room-id',
      text: 'Olá, como vai Dev?',
    });

    expect(message).toBeTruthy();
  });
});
