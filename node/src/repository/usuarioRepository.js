import {connectToDatabase} from "../../db.js";

async function createUsuario(usuario) {
    const client = await connectToDatabase();
    sql = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2)'
    return await client.query(sql, [usuario.nome, usuario.email]);;
}

async function listUsuarios() {
    const client = await connectToDatabase();
    sql = 'SELECT * FROM usuarios;';
    const result = await client.query(sql);
    console.log("Resultados: "+result);
    
    return result.rows;
}

async function getUsuarioById(id) {
    const client = await connectToDatabase();
    sql = 'SELECT * FROM usuarios WHERE id = $1';
    const result = await client.query(sql, [id]);
    return result.rows[0];
}

async function updateUsuario(id, usuario) {
    const client = await connectToDatabase();
    sql = 'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3';
    const result = await client.query(sql, [usuario.nome, usuario.email, id]);
    return result.rows[0];
}

async function removeUsuario(id) {
    const client = await connectToDatabase();
    sql = 'DELETE FROM usuarios WHERE id = $1';
    const result = await client.query(sql, [id]);
    return result.rows[0];
}

export {
    createUsuario,
    listUsuarios,
    getUsuarioById,
    updateUsuario,
    removeUsuario,
};    