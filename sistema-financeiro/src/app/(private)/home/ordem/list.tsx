'use client';

import { getClientes } from '@/service/cliente';
import { deleteOrdem, updateOrdemPagamento} from '@/service/ordem';
import { Ordem} from '@/types';
import { HandCoins, Pencil, TrashIcon } from 'lucide-react';
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function OrdemList(props){
    const [ordem, setOrdem] = useState(props?.ordem)
    const [clientes, setCliente] = useState<Cliente[]>([]);

    useEffect(() => {
        async function fetchClientes() {
            setCliente(await getClientes());
        }
        fetchClientes();
    }, [])

    function onDeleteOrdemClick(ordemId: number){
        const msg = deleteOrdem(ordemId);
        const newOrdem = ordem.filter((ordem:any) => ordem.id!=ordemId);
        setOrdem(newOrdem)
    }

    function onPagarClick(ordemId:number){
        // Inicia a chamada à API
        updateOrdemPagamento(ordemId); 

        // Atualiza o estado com base no valor anterior (prevOrdem)
        setOrdem(prevOrdem => {
            return prevOrdem.map(ordem => {
                if (ordem.id === ordemId) {
                    // Retorna o objeto atualizado
                    return { ...ordem, data_pagamento: new Date() };
                }
                // Retorna o objeto original
                return ordem;
            });
        });
    }
   
    return(
        <div>
            <div className='rounded-md bg-blue-400 ml-2 pb-2 pt-2 mb-3 w-25'>
            <Link href={"/home/ordem/form"} className='text-black'>
            <button className='w-full p-'>Criar +</button>
            </Link>
            </div>
            <ul className='space-y-2 w-[1000px] p-2 bottom-0 rounded-md'>
                <li className='flex justify-start gap-2'>
                    <div className='bg-amber-400 p-2 w-[210px] rounded-md text-center'><b>DESCRIÇÃO</b></div>
                    <div className='bg-amber-400 p-2 w-[80px] rounded-md text-center'><b>VALOR</b></div>
                    <div className='bg-amber-400 p-2 w-[150px] rounded-md text-center'><b>INÍCIO</b></div>
                    <div className='bg-amber-400 p-2 w-[150px] rounded-md text-center'><b>FIM</b></div>
                    <div className='bg-amber-400 p-2 w-[150px] rounded-md text-center'><b>PAGAMENTO</b></div>
                    <div className='bg-amber-400 p-2 w-[200px] rounded-md text-center'><b>CLIENTE</b></div>
                    <div className='bg-amber-400 p-2 w-[170px] rounded-md text-center'><b>AÇÕES</b></div>
                </li>
            </ul>
            <ul className='space-y-2 w-[1000px] bg-amber-50 p-2 rounded-md'>
                {(ordem).map((ordem: Ordem)=>
                    <li key={ordem.id} className='flex gap-2'>
                        <div className={`bg-amber-400 p-2 w-75 flex rounded-md text-left`}>
                            {ordem.descricao}
                        </div>
                        <div className='bg-amber-400 p-2 w-25 rounded-md text-center'>
                            {ordem.valor}
                        </div>
                        <div className='bg-amber-400 p-2 w-50 rounded-md text-center'>
                            {ordem.data_inicio.toString().slice(0,10)}
                        </div>
                        <div className='bg-amber-400 p-2 w-50 rounded-md text-center'>
                            {ordem.data_fim.toString().slice(0,10)}
                        </div>
                        <div className='bg-amber-400 p-2 w-50 rounded-md text-center'>
                        {ordem.data_pagamento?.toString().slice(0,10)}
                        </div>
                        <div className='bg-amber-400 p-2 w-75 rounded-md text-center'>
                            {clientes.map((cliente)=>cliente.id==ordem.cliente_id?cliente.nome:"")}
                        </div>
                        <Link href={`/home/ordem/form?descricao=${ordem.descricao}&valor=${ordem.valor}&datainicio=${ordem.data_inicio}&datafim=${ordem.data_fim}&datapagamento=${ordem.data_pagamento}&clienteid=${ordem.cliente_id}`} className='text-black'>
                        <button className='p-2 rounded-md'>
                            <Pencil/>
                        </button>
                        </Link>
                        <button className='p-2 rounded-md' onClick={()=>onDeleteOrdemClick(ordem.id)}>
                            <TrashIcon/>
                        </button>
                        <button className='p-2 rounded-md' onClick={()=>onPagarClick(ordem.id)}>
                            <HandCoins/>
                        </button>
                    </li>)}
            </ul>
        </div>
    );
}