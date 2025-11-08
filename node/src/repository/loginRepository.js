import {connection} from "../../index.js";
import bcrypt from "bcrypt";

let sql = '';

async function authentication(email, senha) {
    sql = 'SELECT id, administrador, senha FROM usuarios WHERE email = $1';
    const auth = await connection.query(sql, [email]);
    
    if (auth.rows.length > 0) {
        const isMatch = await bcrypt.compare(senha, auth.rows[0].senha);
        if(isMatch){
            sql = 'SELECT id, administrador FROM usuarios WHERE email = $1';
            const result = await connection.query(sql, [email]);
            return result.rows[0];
        }
    }
    throw SecurityPolicyViolationEvent;
}

export {
    authentication
}