import {connection} from "../../index.js";

let sql = '';

async function createOrdem(ordem) {
    sql = 'INSERT INTO ordem (data_inicio, data_fim, valor, descricao, status, cliente_id) VALUES ($1, $2, $3, $4, $5, $6)';
    return await connection.query(sql, [ordem.data_inicio, ordem.data_fim, ordem.valor, ordem.descricao, ordem.status, ordem.cliente_id]);
}

// Listar todos os ordem
async function listOrdem() {
    sql = "SELECT * FROM ordem";
    const result = await connection.query(sql);
    return result.rows;
}

async function getOrdemById(id) {
    sql = 'SELECT * FROM ordem WHERE id=$1';
    const result = await connection.query(sql, [id]);
    return result.rows[0];
}

async function updateOrdem(id, ordem) {
    sql = 'UPDATE ordem SET data_inicio = $1, data_fim = $2, valor = $3, descricao = $4, status = $5, cliente_id = $6 WHERE id = $7';
    const result = await connection.query(sql, [ordem.data_inicio, ordem.data_fim, ordem.valor, ordem.descricao, ordem.status, ordem.cliente_id, id]);
    return result.rows;
}

async function removeOrdem(id) {
    sql = 'DELETE FROM ordem WHERE id = $1';
    return await connection.query(sql, [id]);
}

export {
    createOrdem,
    listOrdem,
    getOrdemById,
    updateOrdem,
    removeOrdem,
};    