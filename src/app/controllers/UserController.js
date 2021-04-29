import User from '../models/User'
import Jwt from 'jsonwebtoken'
import configAuthenticate from '../../config/configAuthenticate'

class UserController {

    async store(req, res){

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

}

export default new UserController()