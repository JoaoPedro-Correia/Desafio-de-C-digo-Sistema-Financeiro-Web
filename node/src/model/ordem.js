import {connectToDatabase} from '../../db.js';

export class Ordem{
    static async createTable(){
        const client = await connectToDatabase();
        let sql = `CREATE TABLE IF NOT EXISTS ordem (
            id SERIAL PRIMARY KEY,
            data_inicio TIMESTAMP DEFAULT CURRENT_DATE,
            data_fim TIMESTAMP,
            valor INTEGER NOT NULL,
            descricao TEXT NOT NULL,
            status BOOLEAN NOT NULL,
            cliente_id INTEGER NOT NULL,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        )`;
        await client.query(sql);
    }
}