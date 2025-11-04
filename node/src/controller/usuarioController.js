import { UsuarioService } from '../service/usuarioService.js';
import express from 'express'

const router = express.Router()

router.get('/usuario', (req, res) => {
    try {
        console.log('\nlistados\n ');
        
        const usuarios = UsuarioService.listAllUsuarios();
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send('Erro ao listar usuários');    
    }
});

router.post('/usuarios', async (req, res) => {
  try {
    const usuario = req.body;
    await UsuarioService.createUsuario(usuario);
    res.status(201).send('Usuário criado');
  } catch (error) {
    res.status(500).send('Erro ao criar usuário');
  }
});

router.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioData = req.body;
    await UsuarioService.updateUsuario(id, usuarioData);
    res.status(200).send(`Usuário ${id} atualizado`);
  } catch (error) {
    res.status(500).send('Erro ao atualizar usuário');
  }
});

router.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await UsuarioService.deleteUsuario(id);
    res.status(200).send(`Usuário ${id} deletado`);
  } catch (error) {
    res.status(500).send('Erro ao deletar usuário');
  }
});

export {router as usuarioRouter};