export interface Login {
    email: string;
    senha: string;
}

export interface ReqUsuario {
    id: number;
    nome: string;
    email: string;
    administrador: boolean;
}

export interface ResUsuario {
    nome: string;
    email: string;
    senha: string;
    administrador: boolean;
}

export interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    ativo: boolean;
}

export interface Ordem{
    id: number;
    descricao: string;
    valor: number;
    data_inicio: Date;
    data_fim: Date;
    data_pagamento: Date | null;
    cliente_id: number;
}