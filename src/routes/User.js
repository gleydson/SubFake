import { Router } from 'express';

import authMiddleware from '../middlewares/Auth';
import UserController from '../controllers/UserController';

const routes = new Router();
const auth = new authMiddleware();
const user = new UserController();

routes.post('/api/user', user.insert);
routes.use(auth.checkToken);
routes.get('/api/user/:id', user.getOne);
routes.delete('/api/user/:id', user.removeOne);
routes.get('/api/user', user.getAll);

export default routes;
