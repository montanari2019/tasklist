import Sequelize, { Model } from 'sequelize'


class Task extends Model {
    static init(sequelize) {
        super.init(
        {
            task_title: Sequelize.STRING,
            task_description: Sequelize.STRING,
            check: Sequelize.BOOLEAN,

        },
        {
            sequelize
        })

        return this
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'})
    }
}

export default Task