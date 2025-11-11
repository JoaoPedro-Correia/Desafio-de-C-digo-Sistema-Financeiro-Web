'use client';

import { deleteClientes, getClientes } from '@/service/cliente';
import { Cliente } from '@/types';
import { Pencil, TrashIcon } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react';

export default function ClienteList(props){
    const [clientes, setClientes] = useState(props.clientes)
    const [clientesAtivos, setClientesAtivos] = useState(clientes.filter((cliente:any)=>cliente.ativo==true))
    const [clientesInativos, setClientesInativos] = useState(clientes.filter((cliente:any)=>cliente.ativo!=true))

    function onDeleteClienteClick(clienteId: number){
        // console.log(clienteId)
        const msg = deleteClientes(clienteId);
        const newClientes = clientes.filter((cliente:any) => cliente.id!=clienteId);
        const newClientesAti = clientesAtivos.filter((cliente:any) => cliente.id!=clienteId);
        const newClientesIna = clientesInativos.filter((cliente:any) => cliente.id!=clienteId);
        setClientes(newClientes)
        setClientesAtivos(newClientesAti)
        setClientesInativos(newClientesIna)
    }
   
    return(
        <div>
            <div className='rounded-md bg-blue-400 pb-2 pt-2 mb-3 w-25'>
            <Link href={"/home/cliente/form"} className='text-black'>
            <button className='w-full p-'>Criar +</button>
            </Link>
            </div>
            <ul className='space-y-2 w-[700px] bg-amber-50 p-2 rounded-md'>
                {(clientesAtivos).map((cliente: Cliente)=>
                    <li key={cliente.id} className='flex gap-2'>
                        <div className={`bg-amber-400 p-2 w-75 flex rounded-md text-left`}>
                            {cliente.nome}
                        </div>
                        <div className='bg-amber-400 p-2 w-full rounded-md text-left'>
                            {cliente.email}
                        </div>
                        <div className='bg-amber-400 p-2 w-full rounded-md text-left'>
                            {props.adimplentes.some((adimplente:any)=>adimplente.id===cliente.id)?"Adimplente":"Inadimplente"}
                        </div>
                        <Link href={`/home/cliente/form?nome=${cliente.nome}&email=${cliente.email}&telefone=${cliente.telefone}&ativo=${cliente.ativo}&id=${cliente.id}`} className='text-black'>
                        <button className='p-2 rounded-md'>
                            <Pencil/>
                        </button>
                        </Link>
                        <button className='p-2 rounded-md' onClick={()=>onDeleteClienteClick(cliente.id)}>
                            <TrashIcon/>
                        </button>
                    </li>)}
                {(clientesInativos).map((cliente: Cliente)=>
                    <li key={cliente.id} className='flex gap-2'>
                        <div className={`bg-red-400 p-2 w-75 flex rounded-md text-left`}>
                            {cliente.nome}
                        </div>
                        <div className='bg-red-400 p-2 w-full rounded-md text-left'>
                            {cliente.email}
                        </div>
                        <div className='bg-red-400 p-2 w-full rounded-md text-left'>
                            {props.adimplentes.some((adimplente:any)=>adimplente.id===cliente.id)?"Adimplente":"Inadimplente"}
                        </div>
                        <Link href={`/home/cliente/form?nome=${cliente.nome}&email=${cliente.email}&telefone=${cliente.telefone}&ativo=${cliente.ativo}&id=${cliente.id}`} className='text-black'>
                        <button className='p-2 rounded-md'>
                            <Pencil/>
                        </button>
                        </Link>
                        <button className='p-2 rounded-md' onClick={()=>onDeleteClienteClick(cliente.id)}>
                            <TrashIcon/>
                        </button>
                    </li>)}
            </ul>
        </div>
    );
}