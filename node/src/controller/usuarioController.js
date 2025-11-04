import '../service/usuarioService.js'
import { UsuarioService } from '../service/usuarioService.js';
import express from 'express'

const router = express()

router.get('/usuario', (req, res) => {
    try {
        console.log('\nlistados\n ');
        
        const usuarios = UsuarioService.listAllUsuarios();
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send('Erro ao listar usuários');    
    }
});

router.post('/usuarios', (req, res) => {
  try {
      const usuario = req.body;
      UsuarioService.createUsuario(usuario);
      res.status(201).send('Usuário criado');
  } catch (error) {
      res.status(500).send('Erro ao criar usuário');
  }
});

router.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Usuário ${id} atualizado`);
}); 

router.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Usuário ${id} deletado`);
});

export {router as usuarioRouter};