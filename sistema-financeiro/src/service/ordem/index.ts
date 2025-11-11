import {Ordem} from "@/types";

const base = `http://172.20.0.3:3030`

export const getOrdens = async (): Promise<Ordem[]> => {
    const res = await fetch(`${base}/api/ordem`)
    return res.json();
}

export const getOrdensById = async (id: number): Promise<Ordem[]> => {
    const res = await fetch(`${base}/api/ordem/${id}`)
    return res.json();
}

export const getOrdensByClienteId = async (id: number): Promise<Ordem[]> => {
    const res = await fetch(`${base}/api/ordem/cliente/${id}`)
    return res.json();
}

// Lista ordens consideradas ativas pelo sistema
export const getOrdensAtiva = async (id: number): Promise<Ordem[]> => {
    const res = await fetch(`${base}/api/ordem/cliente/${id}`)
    return res.json();
}

export const createOrdem = async (ordem: Ordem): Promise<number> => {
    const res = await fetch(`${base}/api/ordem`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(ordem),
    })
    return res.status;
}

export const updateOrdem = async (id: number,ordem: Ordem): Promise<number> => {
    const res = await fetch(`${base}/api/ordem/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(ordem),
    })
    return res.status;
}

// Atuzaliza o pagamento para a data corrente
export const updateOrdemPagamento = async (id: number): Promise<number> => {
    const res = await fetch(`${base}/api/ordem/${id}/pagamento`,{
        method: "PUT",
    })
    return res.status;
}

export const deleteOrdem = async (id: number): Promise<number> => {
    const res = await fetch(`${base}/api/ordem/${id}`,{
        method: "DELETE",
    })
    return res.status;
}