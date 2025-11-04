import 'dotenv/config'
import express from 'express'
import './db.js'
import './src/model/usuario.js'
import { Usuario } from './src/model/usuario.js'
import { Cliente } from './src/model/cliente.js'
import { Ordem } from './src/model/ordem.js'

const app = express()
const port = process.env.PGPORT 

//permite o uso de JSON no corpo das requisições
app.use(express.json())

await Usuario.createTable();
await Cliente.createTable();
await Ordem.createTable();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

export { app }