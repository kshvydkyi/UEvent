// import { Application } from 'express';
// import todosRouter from './api/todos.route';
import userRouter from './api/user.router.js';

import { application } from "express";

class AppRouter {
  constructor(app) { this.app = app }

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/user', userRouter);
  }
}

export default AppRouter;