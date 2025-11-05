import {createCliente, listClientes, getClienteById, 
    updateCliente, removeCliente,
    listClientesAtivo
} from '../repository/clienteRepository.js';

export class ClienteService {
    static async createCliente(clienteData) {
        return await createCliente(clienteData);
    }

    static async listAllClientes() {
        return await listClientes();
    }

    static async listAllClientesAtivo(ativo=true) {
        return await listClientesAtivo(ativo);
    }

    static async getClienteById(id) {
        return await getClienteById(id);
    }

    static async updateCliente(id, clienteData) {
        return await updateCliente(id, clienteData);
    }

    static async deleteCliente(id) {
        return await removeCliente(id);
    }
}