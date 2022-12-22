import { server } from "./http";

import '../websocket/chat-service';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
