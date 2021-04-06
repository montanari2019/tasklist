import { Router } from 'express';

const routes = new Router();

routes.get('/inicio', (req, res) => res.json({ ok: true }));

export default routes;
