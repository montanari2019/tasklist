import Sequelize from 'sequelize'
import databaseconfig from '../config/database'
import User from '../app/models/User'
import Task from '../app/models/Task'

const models = [User, Task]

class Database {

    constructor(){
        this.init()
    }
        
    init() {
        // Uma conexão com o banco de dados
        this.connection = new Sequelize(databaseconfig)

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));

    }

}

export default new Database()