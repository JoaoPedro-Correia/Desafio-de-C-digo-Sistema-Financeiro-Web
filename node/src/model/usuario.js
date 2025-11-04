import {connection} from "../../index.js"
// import bcrypt from "bcrypt";

export class Usuario{
    static async createTable(){
        // const client = await connectToDatabase();
        let sql = `CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            administrador BOOLEAN DEFAULT FALSE
        )`;
        await connection.query(sql);

        //verifica se já existe um usuário administrador, se não existir, cria um padrão
        sql = `SELECT * FROM usuarios WHERE administrador = TRUE`;
        if(!(await connection.query(sql)).rows.length){
            sql = `INSERT INTO usuarios (nome, email, administrador) VALUES ('Admin', 'admin@admin.com', TRUE)`;
            await connection.query(sql);
        }
    }
}