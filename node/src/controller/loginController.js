import {LoginService} from '../service/loginService.js';
import express from 'express'
import pkg from 'cors'

const router = express.Router()
router.use(express.json())
router.use(pkg());

router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await LoginService.authentication(email, senha);
        console.log(result);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send('Email e/ou senha estão errados');
    }
});

export {router as loginRouter};