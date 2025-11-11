'use client';

import { deleteClientes} from '@/service/cliente';
import { Cliente } from '@/types';
import { Pencil, TrashIcon } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react';

export default function ClienteList(clients:Cliente[], adimplentes: Cliente[]){
    const [clientes, setClientes] = useState(clients)
    const [clientesAtivos, setClientesAtivos] = useState(clients.filter((cliente:Cliente)=>cliente.ativo==true))
    const [clientesInativos, setClientesInativos] = useState(clients.filter((cliente:Cliente)=>cliente.ativo!=true))

    function onDeleteClienteClick(clienteId: number){
        // console.log(clienteId)
        const msg = deleteClientes(clienteId);
        const newClientes = clientes.filter((cliente:Cliente) => cliente.id!=clienteId);
        const newClientesAti = clientesAtivos.filter((cliente:Cliente) => cliente.id!=clienteId);
        const newClientesIna = clientesInativos.filter((cliente:Cliente) => cliente.id!=clienteId);
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
            <ul className='space-y-2 w-[700px] p-2 bottom-0 rounded-md'>
                <li className='flex justify-start gap-2'>
                    <div className='bg-amber-400 p-2 w-[160px] rounded-md text-center'><b>NOME</b></div>
                    <div className='bg-amber-400 p-2 w-[200px] rounded-md text-center'><b>EMAIL</b></div>
                    <div className='bg-amber-400 p-2 w-[200px] rounded-md text-center'><b>ADIMPLÊNCIA</b></div>
                    <div className='bg-amber-400 p-2 w-[100px] rounded-md text-center'><b>AÇÕES</b></div>
                </li>
            </ul>
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
                            {adimplentes.some((adimplente:Cliente)=>adimplente.id===cliente.id)?"Adimplente":"Inadimplente"}
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
                            {adimplentes.some((adimplente:Cliente)=>adimplente.id===cliente.id)?"Adimplente":"Inadimplente"}
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