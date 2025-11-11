import {Cliente, ResCliente} from "@/types";

const base = `http://172.20.0.3:3030`

export const getClientes = async (): Promise<Cliente[]> => {
    const res = await fetch(`${base}/api/cliente`)
    return res.json();
}

export const getClientesById = async (id:number): Promise<Cliente> => {
    const res = await fetch(`${base}/api/cliente/${id}`)
    return res.json();
}

export const getClientesByAtivo = async (ativo:boolean): Promise<Cliente[]> => {
    const res = await fetch(`${base}/api/cliente/ativo/${ativo}`)
    return res.json();
}

//CLientes Adimplentes
export const getClientesAdimplentes = async (): Promise<Cliente[]> => {
    const res = await fetch(`${base}/api/clienteadimplente`)
    return res.json();
}

//Cientes Inadimplesntes
export const getClientesInadimplentes = async (): Promise<Cliente[]> => {
    const res = await fetch(`${base}/api/clienteinadimplente`)
    return res.json();
}

export const createClientes = async (cliente: ResCliente): Promise<number> => {
    const res = await fetch(`${base}/api/cliente`,{
        method: "POST",
        headers:  {"Content-Type": "application/json"} ,
        body: JSON.stringify(cliente),
    })
    if(!res.ok)
        throw new Error("Credenciais inválidas")
    return res.status;
}

export const updateClientes = async (id:number, cliente: ResCliente): Promise<number> => {
    const res = await fetch(`${base}/api/cliente/${id}`,{
        method: "PUT",
        headers:  {"Content-Type": "application/json"} ,
        body: JSON.stringify(cliente),
    })
    return res.status;
}

export const deleteClientes = async (id:number): Promise<number> => {
    const res = await fetch(`${base}/api/cliente/${id}`,{
        method: "DELETE"
    })
    if(!res.ok)
        throw new Error("Credenciais inválidas")
    return (await res.status);
}