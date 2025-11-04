import { UsuarioService } from '../service/usuarioService.js';
import express from 'express'

const router = express.Router()
router.use(express.json())

router.get('/usuario', async (req, res) => {
    try {
        const usuarios = await UsuarioService.listAllUsuario();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).send('Erro ao listar usuários');    
    }
});

router.get('/usuario/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const usuario = await UsuarioService.getUsuarioById(id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).send('Erro ao listar usuários');    
    }
});

router.post('/usuario', async (req, res) => {
  try {
    const usuario = req.body;
    await UsuarioService.createUsuario(usuario);
    res.status(201).send('Usuário criado');
  } catch (error) {
    res.status(500).send('Erro ao criar usuário');
  }
});

router.put('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioData = req.body;
    await UsuarioService.updateUsuario(id, usuarioData);
    res.status(204).send(`Usuário ${id} atualizado`);
  } catch (error) {
    res.status(500).send('Erro ao atualizar usuário');
  }
});

router.delete('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await UsuarioService.deleteUsuario(id);
    res.status(200).send(`Usuário ${id} deletado`);
  } catch (error) {
    res.status(500).send('Erro ao deletar usuário');
  }
});

export {router as usuarioRouter};