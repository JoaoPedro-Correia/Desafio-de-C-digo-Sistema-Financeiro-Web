import {connection} from "../../index.js";
import bcrypt from "bcrypt";

let sql = '';

async function authentication(email, senha) {
    sql = 'SELECT id, senha FROM usuarios WHERE email = $1';
    const result = await connection.query(sql, [email]);
    
    if (result.rows.length > 0) {
        const isMatch = await bcrypt.compare(senha, result.rows[0].senha);
        if(isMatch)
            return result.rows[0].id;
    }
    throw SecurityPolicyViolationEvent;
}

export {
    authentication
}