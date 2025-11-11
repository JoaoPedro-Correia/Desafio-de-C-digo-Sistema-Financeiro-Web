import {Cliente} from "@/types";

export const getClientes = async (): Promise<Cliente[]> => {
    const res = await fetch(`http://localhost:3030/api/cliente`)
    return res.json();
}

export const getClientesById = async (id:number): Promise<Cliente> => {
    const res = await fetch(`http://localhost:3030/api/cliente/${id}`)
    return res.json();
}

export const getClientesByAtivo = async (ativo:boolean): Promise<Cliente> => {
    const res = await fetch(`http://localhost:3030/api/cliente/ativo/${ativo}`)
    return res.json();
}

//CLientes Adimplentes
export const getClientesAdimplentes = async (): Promise<Cliente> => {
    const res = await fetch(`http://localhost:3030/api/clienteadimplente`)
    return res.json();
}

//Cientes Inadimplesntes
export const getClientesInadimplentes = async (): Promise<Cliente> => {
    const res = await fetch(`http://localhost:3030/api/clienteinadimplente`)
    return res.json();
}

export const createClientes = async (cliente: Cliente): Promise<number> => {
    const res = await fetch(`http://localhost:3030/api/cliente`,{
        method: "POST",
        headers:  {"Content-Type": "application/json"} ,
        body: JSON.stringify(cliente),
    })
    if(!res.ok)
        throw new Error("Credenciais inválidas")
    return res.status;
}

export const updateClientes = async (id:number, cliente: Cliente): Promise<number> => {
    const res = await fetch(`http://localhost:3030/api/cliente/${id}`,{
        method: "PUT",
        headers:  {"Content-Type": "application/json"} ,
        body: JSON.stringify(cliente),
    })
    return res.status;
}

export const deleteClientes = async (id:number): Promise<number> => {
    const res = await fetch(`http://localhost:3030/api/cliente/${id}`,{
        method: "DELETE"
    })
    if(!res.ok)
        throw new Error("Credenciais inválidas")
    return (await res.status);
}