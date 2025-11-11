import {ReqUsuario, ResUsuario, ReqPass} from "@/types";

const base = `http://172.20.0.3:3030`

export const getUsuarios = async (): Promise<ReqUsuario[]> => {
    const res = await fetch(`${base}/api/usuario`)
    return res.json();
}

export const getUsuarioById = async (id: any): Promise<ReqUsuario[]> => {
    const res = await fetch(`${base}/api/usuario/${id}`)
    return res.json();
}

export const getPassById = async (id: any): Promise<ReqPass> => {
    const res = await fetch(`${base}/api/usuariopass/${id}`)
    return res.json();
}

export const createUsuario = async (usuario: ResUsuario): Promise<number> => {
    console.log(usuario)
    const res = await fetch(`${base}/api/usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(usuario), 
    })
    if(!res.ok)
        throw new Error("Credenciais inválidas")
    return res.status;
}

export const updateUsuario = async (id: number, usuario: ResUsuario): Promise<number> => {
    const res = await fetch(`${base}/api/usuario/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(usuario), 
    })
    return res.status;
}

export const deleteUsuario = async (id: number): Promise<string> => {
    const res = await fetch(`${base}/api/usuario/${id}`,{
        method: "DELETE",
    })
    return res.text();
}