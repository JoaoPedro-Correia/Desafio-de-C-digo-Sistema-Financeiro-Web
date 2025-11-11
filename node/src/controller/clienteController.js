import { ClienteService } from '../service/clienteService.js';
import express from 'express'
import cors from 'cors'

const router = express.Router()
router.use(express.json())
router.use(cors())

router.get('/cliente', async (_req, res) => {
    try {
        const clientes = await ClienteService.listAllClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).send('Erro ao listar clientes');    
    }
});

//List clientes adimplentes
router.get('/clienteadimplente', async (_req, res) => {
    try {
        const clientes = await ClienteService.listAllClientesAdimplentes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).send('Erro ao listar clientes');    
    }
});

//List clientes inadimplentes
router.get('/clienteinadimplente', async (_req, res) => {
    try{
        const clientes = await ClienteService.listAllClientesInadimplentes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).send('Erro ao listar clientes');    
    }
});

router.get('/cliente/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const cliente = await ClienteService.getClienteById(id);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).send('Erro ao listar clientes');    
    }
});

// Listar clientes ativos/inativos
router.get('/cliente/ativo/:ativo', async (req, res) => {
    try {
        const {ativo} = req.params; 
        const clientes = await ClienteService.getClientesAtivo(ativo);
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).send('Erro ao listar clientes');    
    }
});

router.post('/cliente', async (req, res) => {
  try {
    const cliente = req.body;
    console.log(cliente);
    await ClienteService.createCliente(cliente);
    res.status(201).send('Cliente criado');
  } catch (error) {
    res.status(500).send('Erro ao criar cliente');
  }
});

router.put('/cliente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const clienteData = req.body;
    await ClienteService.updateCliente(id, clienteData);
    res.status(204).send(`Cliente ${id} atualizado`);
  } catch (error) {
    res.status(500).send('Erro ao atualizar cliente');
  }
});

router.delete('/cliente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ClienteService.deleteCliente(id);
    res.status(200).send(`Cliente ${id} deletado`);
  } catch (error) {
    res.status(500).send('Erro ao deletar cliente');
  }
});

export {router as clienteRouter};