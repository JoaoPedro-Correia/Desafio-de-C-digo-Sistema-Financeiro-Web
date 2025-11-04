import {fastify} from 'fastify'

const server = fastify()

server.get('/', ()=>{
    return 'Página inicial'
})

//Cria
server.post('/user', async (req, res)=>{
    res.code(200)
    res.send('Usuario criado')
})

//Lista usuarios
server.get('/user', async (req, res)=>{
    res.send(`Usuário encontrado!`)
})

//Atualiza usuario
server.put('/user/:id', async (req, res)=>{  
    const {id} = req.params
    res.send(`Usuário ${id} atualizado com sucesso!`)
})

//Deleta usuario
server.delete('/user/:id', async (req, res)=>{  
    const {id} = req.params
    res.send(`Usuário ${id} deletado com sucesso!`)
})

server.listen({
    port:3333,
})