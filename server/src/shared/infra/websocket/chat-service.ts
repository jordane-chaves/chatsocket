import { io } from "../http/http";

import { userHandlers } from './handlers/user-handlers';
import { chatHandlers } from './handlers/chat-handlers';
import { messageHandlers } from './handlers/message-handlers';

io.on('connect', (socket) => {
  userHandlers(io, socket);
  chatHandlers(io, socket);
  messageHandlers(io, socket);
});
