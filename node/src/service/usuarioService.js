import {createUsuario, listUsuarios, getUsuarioById, 
    updateUsuario, removeUsuario, getUsuarioSenhaById
} from '../repository/usuarioRepository.js';

export class UsuarioService {
    static async createUsuario(usuarioData) {
        return await createUsuario(usuarioData);
    }

    static async listAllUsuario() {
        return await listUsuarios();
    }

    static async getUsuarioById(id) {
        return await getUsuarioById(id);
    }

    static async getSenhaById(id) {
        return await getUsuarioSenhaById(id);
    }

    static async updateUsuario(id, usuarioData) {
        return await updateUsuario(id, usuarioData);
    }

    static async deleteUsuario(id) {
        return await removeUsuario(id);
    }
}