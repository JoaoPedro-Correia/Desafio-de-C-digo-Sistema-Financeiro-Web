import 'dotenv/config'
import express from 'express'
import {connectToDatabase} from './db.js'
import './src/model/usuario.js'
import { Usuario } from './src/model/usuario.js'
import { Cliente } from './src/model/cliente.js'
import { Ordem } from './src/model/ordem.js'
import {usuarioRouter} from './src/controller/usuarioController.js'

export { app }

const app = express()
const port = process.env.PORT || 3030

//permite o uso de JSON no corpo das requisições
app.use(express.json())

app.use("/api", usuarioRouter)

//Conexao com o banco de dados
export const connection = await connectToDatabase();

try {
    app.get('/', async (req, res) => {
        res.json({mensagem:'API de Gestão de Usuários, Clientes e Ordens de Serviço'})
    });
} catch(err) {
    console.error('Erro ao definir rota raiz:', err);
}

await Usuario.createTable();
await Cliente.createTable();
await Ordem.createTable();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
