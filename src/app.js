import express from 'express'
import routes from './routes'
import cors from 'cors'

//Importando nossa data Base 
import './database'

class App {
    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    middleware() {
        this.server.use(cors())
        this.server.use(express.json());
    }

    router() {
        this.server.use(routes);
    }
}

export default new App().server;
