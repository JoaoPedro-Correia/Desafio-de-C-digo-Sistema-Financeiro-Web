import {connection} from "../../index.js";

let sql = '';

async function createCliente(cliente) {
    sql = 'INSERT INTO clientes (nome, email, telefone, ativo) VALUES ($1, $2, $3, $4)';
    return await connection.query(sql, [cliente.nome, cliente.email, cliente.telefone, cliente.ativo]);
}

// Listar todos os clientes
async function listClientes() {
    sql = "SELECT * FROM clientes";
    const result = await connection.query(sql);
    return result.rows;
}

async function listClientesAdimplentes() {
    sql = `SELECT * from clientes
        EXCEPT
        SELECT cli.id,cli.nome,cli.email,cli.telefone,cli.ativo 
        FROM clientes as cli 
        join ordem as ord on 
        cli.id=ord.cliente_id and
        ord.data_pagamento is null
        GROUP BY cli.id`;
    const result = await connection.query(sql);
    return result.rows;
}

async function getClienteByAtivo(ativo) {
    sql = "SELECT * FROM clientes WHERE ativo = $1";
    const result = await connection.query(sql, [ativo]);
    return result.rows;
}

async function getClienteById(id) {
    sql = 'SELECT * FROM clientes WHERE id=$1';
    const result = await connection.query(sql, [id]);
    return result.rows[0];
}

async function updateCliente(id, cliente) {
    sql = 'UPDATE clientes SET nome = $1, email = $2, telefone = $3, ativo = $4 WHERE id = $5';
    const result = await connection.query(sql, [cliente.nome, cliente.email, cliente.telefone, cliente.ativo, id]);
    return result.rows;
}

async function removeCliente(id) {
    sql = 'DELETE FROM clientes WHERE id = $1';
    return await connection.query(sql, [id]);
}

export {
    createCliente,
    listClientes,
    listClientesAdimplentes,
    getClienteById,
    getClienteByAtivo,
    updateCliente,
    removeCliente,
};    