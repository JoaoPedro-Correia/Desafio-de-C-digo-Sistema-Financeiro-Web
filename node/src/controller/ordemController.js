import { OrdemService } from '../service/ordemService.js';
import express from 'express'

const router = express.Router()
router.use(express.json())

//lista todas as ordens
router.get('/ordem', async (_req, res) => {
  try {
    const ordems = await OrdemService.listAllOrdem();
    res.status(200).json(ordems);
  } catch (error) {
    res.status(500).send('Erro ao listar ordems');    
  }
});

//get ordem por id
router.get('/ordem/:id', async (req, res) => {
  try {
    const {id} = req.params; 
    const ordem = await OrdemService.getOrdemById(id);
    res.status(200).json(ordem);
  } catch (error) {
    res.status(500).send('Erro ao listar ordens');    
  }
});

// lista ordens por cliente_id
router.get('/ordem/cliente/:id', async (req, res) => {
  try {
    const {id} = req.params; 
    const ordem = await OrdemService.getOrdemByClienteId(id);
    res.status(200).json(ordem);
  } catch (error) {
    res.status(500).send('Erro ao listar ordens');    
  }
});

//Lista ordens ativas
router.get('/ordemativa', async (_req, res) => {
  try {
    const ordem = await OrdemService.listOrdemAtiva();
    res.status(200).json(ordem);
  } catch (error) {
    res.status(500).send(`Erro ao listar ordens: ${error.message}`);
  }
});

//cria uma nova ordem
router.post('/ordem', async (req, res) => {
  try {
    const ordem = req.body;
    await OrdemService.createOrdem(ordem);
    res.status(201).send('Ordem criada');
  } catch (error) {
    res.status(500).send(`Erro ao criar ordem: ${error.message}`);
  }
});

//atualiza uma ordem
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

//atualiza a data do pagamento
router.put('/ordem/:id/pagamento', async (req, res) => {
  try {
    const { id } = req.params;
    await OrdemService.updatePagamento(id);
    res.status(204).send(`Ordem ${id} atualizado`);
  } catch (error) {
    res.status(500).send('Erro ao atualizar ordem');
  }
});

//deleta uma ordem
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