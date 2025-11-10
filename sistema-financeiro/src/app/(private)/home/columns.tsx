'use client';

import { ReqUsuario, Cliente, Ordem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columnsUsuario: ColumnDef<ReqUsuario>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'nome',
        header: 'Nome',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'administrador',
        header: 'Administrador',
    },
];

export const columnsCliente: ColumnDef<Cliente>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'nome',
        header: 'Nome',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'telefone',
        header: 'Telefone',
    },
    {
        accessorKey: 'Ativo',
        header: 'Ativo',
    },
];

export const columnsOrdem: ColumnDef<Ordem>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'descricao',
        header: 'Descrição',
    },
    {
        accessorKey: 'valor',
        header: 'Valor',
    },
    {
        accessorKey: 'data_inicio',
        header: 'Data de Início',
    },
    {
        accessorKey: 'data_fim',
        header: 'Data Fim',
    },
    {
        accessorKey: 'data_pagamento',
        header: 'Data de Pagamento',
    },
    {
        accessorKey: 'cliente_id',
        header: 'Responsável',
    },
];