import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const routes = new Router();
const session = new SessionController();

routes.post('/api/signIn', session.singIn);

export default routes;
