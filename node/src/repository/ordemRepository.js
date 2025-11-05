import {connection} from "../../index.js";

let sql = '';

async function createOrdem(ordem) {
    sql = 'INSERT INTO ordem (data_inicio, data_fim, valor, descricao, cliente_id) VALUES ($1, $2, $3, $4, $5)';
    return await connection.query(sql, [ordem.data_inicio, ordem.data_fim, ordem.valor, ordem.descricao, ordem.cliente_id]);
}

async function listOrdem() {
    sql = "SELECT * FROM ordem";
    const result = await connection.query(sql);
    return result.rows;
}

async function listOrdemAtiva() {
    sql = "SELECT * FROM ordem WHERE data_inicio <= CURRENT_DATE AND data_fim > CURRENT_DATE";
    const result = await connection.query(sql);
    return result.rows;
}

async function getOrdemById(id) {
    sql = 'SELECT * FROM ordem WHERE id=$1';
    const result = await connection.query(sql, [id]);
    return result.rows[0];
}

async function getOrdemByClienteId(id) {
    sql = 'SELECT * FROM ordem WHERE cliente_id=$1';
    const result = await connection.query(sql, [id]);
    return result.rows;
}

async function updateOrdem(id, ordem) {
    sql = 'UPDATE ordem SET data_inicio = $1, data_fim = $2, valor = $3, descricao = $4, data_pagamento = $5, cliente_id = $6 WHERE id = $7';
    const colunas = [ordem.data_inicio, ordem.data_fim, ordem.valor, ordem.descricao, ordem.data_pagamento, ordem.cliente_id, id];
    const result = await connection.query(sql, colunas);
    return result.rows;
}

async function updatePagamento(id) {
    sql = 'UPDATE ordem SET data_pagamento = CURRENT_DATE WHERE id = $1';
    const result = await connection.query(sql, [id]);
    return result.rows;
}

async function removeOrdem(id) {
    sql = 'DELETE FROM ordem WHERE id = $1';
    return await connection.query(sql, [id]);
}

export {
    createOrdem,
    listOrdem,
    listOrdemAtiva,
    getOrdemById,
    getOrdemByClienteId,
    updateOrdem,
    updatePagamento,
    removeOrdem,
};    