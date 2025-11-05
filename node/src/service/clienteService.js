import {createCliente, listClientes, getClienteById, 
    updateCliente, removeCliente,
    getClienteByAtivo, listClientesAdimplentes
} from '../repository/clienteRepository.js';

export class ClienteService {
    static async createCliente(clienteData) {
        this.#validateClienteData(clienteData);
        return await createCliente(clienteData);
    }

    static async listAllClientes() {
        return await listClientes();
    }

    static async listAllClientesAdimplentes() {
        return await listClientesAdimplentes();
    }

    static async listAllClientesInadimplentes() {
        const clientesAdimplentes = await listClientesAdimplentes();
        const allClientes =  await listClientes();

        const clientesInadimplentes = allClientes.filter(cliente => 
            !clientesAdimplentes.some(adimplente => adimplente.id === cliente.id)
        );
        
        return clientesInadimplentes;
    }

    static async getClientesAtivo(ativo=true) {
        return await getClienteByAtivo(ativo);
    }

    static async getClienteById(id) {
        return await getClienteById(id);
    }

    static async updateCliente(id, clienteData) {
        this.#validateClienteData(clienteData);
        return await updateCliente(id, clienteData);
    }

    static async deleteCliente(id) {
        return await removeCliente(id);
    }

    static #validateClienteData(clienteData) {
        if(!clienteData.nome){
            throw new Error('Nome é obrigatório');
        }

        if(!clienteData.email){
            throw new Error('Email é obrigatório');
        }

        if(!clienteData.telefone){
            throw new Error('Telefone é obrigatório');
        }

        if(!clienteData.ativo){
            throw new Error('Status de ativo é obrigatório');
        }
    }
}