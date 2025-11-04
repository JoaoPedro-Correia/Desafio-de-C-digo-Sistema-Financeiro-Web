import { OrdemService } from '../service/ordemService.js';
import express from 'express'

const router = express.Router()
router.use(express.json())

router.get('/ordem', async (_req, res) => {
  try {
    const ordems = await OrdemService.listAllOrdem();
    res.status(200).json(ordems);
  } catch (error) {
    res.status(500).send('Erro ao listar ordems');    
  }
});

router.get('/ordem/:id', async (req, res) => {
  try {
    const {id} = req.params; 
    const ordem = await OrdemService.getOrdemById(id);
    res.status(200).json(ordem);
  } catch (error) {
    res.status(500).send('Erro ao listar ordens');    
  }
});

router.post('/ordem', async (req, res) => {
  try {
    const ordem = req.body;
    await OrdemService.createOrdem(ordem);
    res.status(201).send('Ordem criado');
  } catch (error) {
    res.status(500).send('Erro ao criar ordem');
  }
});

router.put('/ordem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ordemData = req.body;
    await OrdemService.updateOrdem(id, ordemData);
    res.status(204).send(`Ordem ${id} atualizado`);
  } catch (error) {
    res.status(500).send('Erro ao atualizar ordem');
  }
});

router.delete('/ordem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await OrdemService.deleteOrdem(id);
    res.status(200).send(`Ordem ${id} deletado`);
  } catch (error) {
    res.status(500).send('Erro ao deletar ordem');
  }
});

export {router as ordemRouter};