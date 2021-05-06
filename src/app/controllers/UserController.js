import User from '../models/User'
import Jwt from 'jsonwebtoken'
import configAuthenticate from '../../config/configAuthenticate'
import * as Yup from 'yup'
import { response } from 'express'

class UserController {

    async store(req, res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error:'Falha na Validação' })
        }

        const userExists = await User.findOne({

            where: {email: req.body.email}

        })

        if(userExists) {
            return res.status(400).json({ erro: 'Usuário ja existe.' })
        }

        const { id, name, email } = await User.create(req.body)

        return res.json({
            id,
            name,
            email
        })

    }

    async index(req, res) {
        const { password_hash, ...response } = await User.findAll()


        return res.status(200).json(response)
    }

    async authentication (req, res){
        const { email, password } = req.body

        const user = await User.findOne({ where: {email} })

        //Verificando se o Usuário existe
        if(!user){
            return res.status(401).json({ erro: 'Usuário não exite'})
            
        }

        // Verificando se a Senha infromada está correta
        if(!(await user.checkPassword(password))){
            return res.status(401).json({ erro: 'Senha incorreta'})
            
        }

        const {id, name } = user

        return res.json({
            user:{
                id,
                name,
                email
            },
            token: Jwt.sign ({ id, }, configAuthenticate.hash, {
                expiresIn: configAuthenticate.expiration
             })
            
        })
    }

    async update (req,res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) => 
                    oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string()
                .when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field    
            )
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ erro: 'Falha na validação'})
        }

        const { email, oldPassword} = req.body

        const user = await User.findByPk(req.userId)

        if(email !== user.email){
            const userExists = await User.findOne({
                where: { email: email}
            })

            if(userExists){
                return res.status(400).json({ error: 'Email ja cadastrado'})
            }
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({ erro: 'Senha Incorreta'})
        }

        const {id, name } = await user.update(req.body)

        return res.json({ 
            id,
            name,
            email
        })

    }

    async destroy (req, res) {
        const user = await User.findByPk(req.userId)

        await user.destroy()

        return res.json({ message: 'Usário deletado' })
    }

}

export default new UserController()