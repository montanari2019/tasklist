import { Router } from 'express';

import UserController from './app/controllers/UserController'
import Autorization from './app/middleware/auth'

const routes = new Router();

routes.get('/inicio', (req, res) => res.json({ ok: true }));

routes.post('/user', UserController.store)
routes.get('/users', UserController.index)
routes.post('/authenticate', UserController.authentication)

// Todas as rotas abaixo estão sendo autorizadas pelo token

routes.use(Autorization)

routes.put('/userUpadte', UserController.update)    
routes.delete('/userDelete', UserController.destroy)    

export default routes;
