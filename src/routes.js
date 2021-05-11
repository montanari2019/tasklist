import { Router } from 'express';

import UserController from './app/controllers/UserController'
import TaskController from './app/controllers/TaskContoller'
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

routes.post('/task', TaskController.store)
routes.get('/tasklist', TaskController.index)
routes.get('/taskConclusion', TaskController.conclusion)
routes.put('/taskUpdate/:task_id', TaskController.update)
routes.delete('/taskDelete/:task_id', TaskController.destroy)

export default routes;
