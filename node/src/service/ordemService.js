import {createOrdem, listOrdem, getOrdemById, 
    updateOrdem, removeOrdem
} from '../repository/ordemRepository.js';

export class OrdemService {
    static async createOrdem(ordemData) {
        return await createOrdem(ordemData);
    }

    static async listAllOrdem() {
        return await listOrdem();
    }

    static async getOrdemById(id) {
        return await getOrdemById(id);
    }

    static async updateOrdem(id, ordemData) {
        return await updateOrdem(id, ordemData);
    }

    static async deleteOrdem(id) {
        return await removeOrdem(id);
    }
}