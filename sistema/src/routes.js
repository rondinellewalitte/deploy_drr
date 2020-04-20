import { Router } from 'express';

import UserController from './app/controllers/UserController';
import UsuarioController from './app/controllers/UsuarioController';
import SessionsController from './app/controllers/SessionController';
import RegisterController from './app/controllers/RegisterController';
import ListController from './app/controllers/ListController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionsController.store);
routes.use(authMiddleware);
routes.post('/usuario', UsuarioController.store);
routes.post('/users', UserController.store);
routes.get('/id', UserController.verificarid);
routes.post('/list', ListController.list);
routes.get('/listGroupId', ListController.listGroupId);
routes.get('/cadastrar', RegisterController.cadastrar);
routes.get('/grupos', RegisterController.findgroup);

export default routes;
