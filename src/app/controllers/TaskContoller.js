import Task from '../models/Task'
import * as Yup from 'yup'

class TaskController {

    async index (req, res) {
        const tasks = await Task.findAll({ 
            where: { user_id: req.userId, check: false}
        })

        return res.json(tasks)
    }

    async conclusion (req, res) {
        const tasks = await Task.findAll({
            where: { user_id: req.userId, check: true}
        })

        return res.json(tasks)
    }

    async store (req, res){

        const schema = Yup.object().shape({
            task_title: Yup.string().required(),
            task_description: Yup.string().required()

        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Task invalid' })
        }

        const { task_title, task_description } = req.body

        console.log(task_title)

        const task = await Task.create({
            task_title,
            task_description,
            user_id: req.userId          

        })

        return res.json(task)
    }

    async update(req, res){

        const { task_id } = req.params

        const task = await Task.findByPk(task_id)

        if(!task){
            return res.status(400).json({ error: 'Task not found'})
        }

        const schema = Yup.object().shape({
            task_title: Yup.string(),
            task_description: Yup.string(),
            check: Yup.boolean(),

        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação' })
        }

        if(task.user_id !== req.userId){
            return res.status(401).json({ error: 'Requisição Não autorizada'})
        }

        
        await task.update(req.body)

        return res.json(task)
        
    }

    async destroy (req, res) {
        const { task_id } = req.params

        const task = await Task.findByPk(task_id)

        if(!task){
            return res.status(400).json({error: 'Task not found'})
        }
        if(task.user_id !== req.userId){
            return res.status(401).json({ error: 'Requisição não autorizada'})
        }

        await task.destroy()

        return res.json({ message: 'Tarefa deletada com sucesso'})
    }
}

export default new TaskController();