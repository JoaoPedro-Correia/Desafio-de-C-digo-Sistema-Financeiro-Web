import { Pool } from "pg";

let pool;

export async function connectToDatabase() {
    //verifica se já existe uma conexão ativa
    // if(global.connection){
    //     return global.connection.connect();
    // }

    if(!pool){
        pool = new Pool({
            host: process.env.PGHOST,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            port: process.env.PGPORT,
        });
        console.log("->Nova conexão criada com o banco de dados.");
    }
    return pool.connect();
    // const client = await pool.connect();

    // console.log("Conectado ao banco de dados com sucesso!");
    // let row = await client.query('SELECT NOW()');
    // console.log("Horario do DB:",row.rows);

    // global.connection = client;
    // return pool.connect();
}

connectToDatabase();