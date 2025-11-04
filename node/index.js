import 'dotenv/config'
import express from 'express'
import {connectToDatabase} from './db.js'
import './src/model/usuario.js'
import { Usuario } from './src/model/usuario.js'
import { Cliente } from './src/model/cliente.js'
import { Ordem } from './src/model/ordem.js'
import {usuarioRouter} from './src/controller/usuarioController.js'
import {loginRouter} from './src/controller/loginController.js'
import {clienteRouter} from './src/controller/clienteController.js'
import {ordemRouter} from './src/controller/ordemController.js'


const app = express()
const port = process.env.PORT || 3030

//Rotas
app.use("/api", usuarioRouter)
app.use("/api", loginRouter)
app.use("/api", clienteRouter)
app.use("/api", ordemRouter)

//Conexao com o banco de dados
const connection = await connectToDatabase();

//Criar tabelas se nao existirem
await Usuario.createTable();
await Cliente.createTable();
await Ordem.createTable();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

export { connection }