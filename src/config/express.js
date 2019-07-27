import express from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io';

import sessionRouter from '../routes/Session';
import userRouter from '../routes/User';
import productRouter from '../routes/Product';

const app = express();
const server = http.Server(app);
const io = socketIo(server);

export default (function() {
  app.use(cors());

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

  app.use(sessionRouter);
  app.use(userRouter);
  app.use(productRouter);

  return app;
})();
