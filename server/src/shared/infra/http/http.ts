import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import '@shared/container';
import '../database/mongo';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {}
});

io.on('connection', (socket) => {
  console.log('[ SOCKET ID ]', socket.id);
})

export { server, io };
