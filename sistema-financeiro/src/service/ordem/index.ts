import {Ordem} from "@/types";

export const getOrdens = async (): Promise<Ordem[]> => {
    const res = await fetch(`http://localhost:3030/api/ordem`)
    return res.json();
}

export const getOrdensById = async (id: number): Promise<Ordem[]> => {
    const res = await fetch(`http://localhost:3030/api/ordem/${id}`)
    return res.json();
}

export const getOrdensByClienteId = async (id: number): Promise<Ordem[]> => {
    const res = await fetch(`http://localhost:3030/api/ordem/cliente/${id}`)
    return res.json();
}

// Lista ordens consideradas ativas pelo sistema
export const getOrdensAtiva = async (id: number): Promise<Ordem[]> => {
    const res = await fetch(`http://localhost:3030/api/ordem/cliente/${id}`)
    return res.json();
}

export const createOrdem = async (ordem: Ordem): Promise<string> => {
    const res = await fetch(`http://localhost:3030/api/ordem`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(ordem),
    })
    return res.text();
}

export const updateOrdem = async (id: number,ordem: Ordem): Promise<string> => {
    const res = await fetch(`http://localhost:3030/api/ordem/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(ordem),
    })
    return res.text();
}

// Atuzaliza o pagamento para a data corrente
export const updateOrdemPagamento = async (id: number): Promise<string> => {
    const res = await fetch(`http://localhost:3030/api/ordem/${id}/pagamento`,{
        method: "PUT",
    })
    return res.text();
}

export const deleteOrdem = async (id: number): Promise<string> => {
    const res = await fetch(`http://localhost:3030/api/ordem/${id}`,{
        method: "DELETE",
    })
    return res.text();
}