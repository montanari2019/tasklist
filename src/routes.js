import { Router } from 'express';

import UserController from './app/controllers/UserController'

const routes = new Router();

routes.get('/inicio', (req, res) => res.json({ ok: true }));

routes.post('/user', UserController.store)
routes.post('/authenticate', UserController.authentication)

export default routes;
