import Sequelize from 'sequelize'
import databaseconfig from '../config/database'
import User from '../app/models/User'

const models = [User]

class Database {

    constructor(){
        this.init()
    }
        
    init() {
        // Uma conexão com o banco de dados
        this.connection = new Sequelize(databaseconfig)

        models.map(model => model.init(this.connection))

    }

}

export default new Database()