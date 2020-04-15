import { Router } from 'express';

import UserController from './app/controllers/UserController';
import RegisterController from './app/controllers/RegisterController';
import ListController from './app/controllers/ListController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/id', UserController.verificarid);
routes.post('/list', ListController.list);
routes.get('/listGroupId', ListController.listGroupId);
routes.get('/cadastrar', RegisterController.cadastrar);
routes.get('/grupos', RegisterController.findgroup);

export default routes;
