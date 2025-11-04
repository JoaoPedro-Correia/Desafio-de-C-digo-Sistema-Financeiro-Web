import {connection} from "../../index.js"
import bcrypt from "bcrypt";

export class Usuario{
    static async createTable(){
        let sql = `CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            administrador BOOLEAN DEFAULT FALSE
        )`;
        await connection.query(sql);
        
        //verifica se já existe um usuário administrador, se não existir, cria um padrão
        sql = `SELECT * FROM usuarios WHERE administrador = TRUE`;
        if(!(await connection.query(sql)).rows.length){
            const ps = await bcrypt.hash(process.env.ADPASSWORD,10);
            sql = `INSERT INTO usuarios (nome, email, senha, administrador) VALUES ('Admin', 'admin@admin.com', $1,TRUE)`;
            await connection.query(sql,[ps]);
        }
    }
}