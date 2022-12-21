import { io } from "../http/http";

io.on('connect', (socket) => {
  socket.emit('start', {
    message: 'Seu chat foi iniciado!'
  })
});
