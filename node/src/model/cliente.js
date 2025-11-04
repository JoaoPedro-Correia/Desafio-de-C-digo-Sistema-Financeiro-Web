import {connection} from '../../index.js'; 

export class Cliente{
    static async createTable(){
        // const client = await connectToDatabase();
        let sql = `CREATE TABLE IF NOT EXISTS clientes (
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            telefone TEXT NOT NULL,
            ativo BOOLEAN NOT NULL DEFAULT TRUE
        )`;
        await connection.query(sql);
    }
}