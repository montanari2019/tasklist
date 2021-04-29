import express from 'express'
import routes from './routes'

//Importando nossa data Base 
import './database'

class App {
    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    middleware() {
        this.server.use(express.json());
    }

    router() {
        this.server.use(routes);
    }
}

export default new App().server;
