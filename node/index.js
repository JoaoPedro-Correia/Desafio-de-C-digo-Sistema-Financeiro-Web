import 'dotenv/config'
import express from 'express'
import {connectToDatabase} from './db.js'
import './src/model/usuario.js'
import { Usuario } from './src/model/usuario.js'
import { Cliente } from './src/model/cliente.js'
import { Ordem } from './src/model/ordem.js'
import {usuarioRouter} from './src/controller/usuarioController.js'
import {loginRouter} from './src/controller/loginController.js'


const app = express()
const port = process.env.PORT || 3030

app.use("/api", usuarioRouter)
app.use("/api", loginRouter)

//Conexao com o banco de dados
const connection = await connectToDatabase();

await Usuario.createTable();
await Cliente.createTable();
await Ordem.createTable();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

export { app, connection }