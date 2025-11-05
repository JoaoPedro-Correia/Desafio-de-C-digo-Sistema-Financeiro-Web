import {createOrdem, listOrdem, getOrdemById, 
    updateOrdem, removeOrdem, getOrdemByClienteId,
    listOrdemAtiva, updatePagamento
} from '../repository/ordemRepository.js';

export class OrdemService {
    static async createOrdem(ordemData) {
        this.#validateOrdemData(ordemData);
        return await createOrdem(ordemData);
    }

    static async listAllOrdem() {
        return await listOrdem();
    }

    static async listOrdemAtiva() {
        return await listOrdemAtiva();
    }

    static async getOrdemById(id) {
        return await getOrdemById(id);
    }

    static async getOrdemByClienteId(id) {
        return await getOrdemByClienteId(id);
    }

    static async updateOrdem(id, ordemData) {
        this.#validateOrdemData(ordemData);
        if(!ordemData.data_pagamento){
            ordemData.data_pagamento = null;
        }
        return await updateOrdem(id, ordemData);
    }

    static async updatePagamento(id) {
        return await updatePagamento(id);
    }

    static async deleteOrdem(id) {
        return await removeOrdem(id);
    }

    static #validateOrdemData(ordemData) {
        if (!ordemData.data_inicio) {
            throw new Error('Data de início obrigatória');
        }
        
        if(!ordemData.data_fim){
            throw new Error('Data de fim obrigatória');
        }

        if(new Date(ordemData.data_inicio) > new Date(ordemData.data_fim)){
            throw new Error('Datas erradas');
        }

        if(!ordemData.valor || ordemData.valor <= 0){
            throw new Error('Valor inválido');
        }

        if(!ordemData.descricao){
            throw new Error('Descrição obrigatória');
        }

        if(!ordemData.cliente_id){
            throw new Error('Cliente é obrigatório');
        }
    } 
}