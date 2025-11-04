import {authentication} from '../repository/loginRepository.js';

export class LoginService {
    static async authentication(email, senha){
        return await authentication(email, senha);
    }
}