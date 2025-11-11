import {connection} from "../../index.js";
import bcrypt from "bcrypt";

let sql = '';

async function createUsuario(usuario) {
    const ps = await bcrypt.hash(usuario.senha,10);
    sql = 'INSERT INTO usuarios (nome, email, senha, administrador) VALUES ($1, $2, $3, $4)';
    return await connection.query(sql, [usuario.nome, usuario.email, ps, usuario.administrador]);
}

// Listar todos os usuários
async function listUsuarios() {
    sql = "SELECT usuarios.id, usuarios.nome, usuarios.email, usuarios.administrador FROM usuarios";
    const result = await connection.query(sql);
    return result.rows;
}

async function getUsuarioById(id) {
    sql = 'SELECT usuarios.id, usuarios.nome, usuarios.email, usuarios.administrador FROM usuarios WHERE id=$1';
    const result = await connection.query(sql, [id]);
    return result.rows[0];
}

async function getUsuarioSenhaById(id) {
    sql = 'SELECT usuarios.senha FROM usuarios WHERE id=$1';
    const result = await connection.query(sql, [id]);
    return result.rows[0];
}

async function updateUsuario(id, usuario) {
    const ps = await bcrypt.hash(usuario.senha, 10);

    sql = 'UPDATE usuarios SET nome = $1, email = $2, administrador = $3, senha = $4 WHERE id = $5';
    const result = await connection.query(sql, [usuario.nome, usuario.email, usuario.administrador, ps, id]);
    return result.rows;
}

async function removeUsuario(id) {
    sql = 'DELETE FROM usuarios WHERE id = $1';
    return await connection.query(sql, [id]);
}

export {
    createUsuario,
    listUsuarios,
    getUsuarioById,
    updateUsuario,
    removeUsuario,
};    