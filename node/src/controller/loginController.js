import {LoginService} from '../service/loginService.js';
import express from 'express'
import pkg from 'cors'

const router = express.Router()
router.use(express.json())
router.use(pkg());

router.post('/login', async (req, res) => {
    try {
        console.log("entrou");
        
        const { email, senha } = req.body;
        await LoginService.authentication(email, senha);
        res.status(200).send('Login realizado com sucesso');
    } catch (error) {
        res.status(500).send('Email e/ou senha estão errados');
    }
});

export {router as loginRouter};