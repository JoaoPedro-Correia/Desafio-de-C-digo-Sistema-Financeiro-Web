'use client';

import { deleteClientes, getClientes } from '@/service/cliente';
import { Cliente } from '@/types';
import { Pencil, TrashIcon } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react';

export default function ClienteList(props){
    const [clientes, setClientes] = useState(props.clientes)

    function onDeleteClienteClick(clienteId: number){
        // console.log(clienteId)
        const msg = deleteClientes(clienteId);
        const newClientes = clientes.filter((cliente:any) => cliente.id!=clienteId);
        setClientes(newClientes)
    }
   
    return(
        <div>
            <div className='rounded-md bg-blue-400 pb-2 pt-2 mb-3 w-25'>
            <Link href={"/home/cliente/form?nome=joao"} className='text-black'>
            <button className='w-full p-'>Criar +</button>
            </Link>
            </div>
            <ul className='space-y-2 w-[500px] bg-amber-50 p-2 rounded-md'>
                {(clientes).map((cliente: Cliente)=>
                    <li key={cliente.id} className='flex gap-2'>
                        <button className={`bg-amber-400 p-2 w-75 flex rounded-md text-left 
                            ${!cliente.ativo && "bg-red-500"
                            }`}>
                            {cliente.nome}
                        </button>
                        <button className='bg-amber-400 p-2 w-full rounded-md text-left'>
                            {cliente.email}
                        </button>
                        <button className='p-2 rounded-md'>
                            <Pencil/>
                        </button>
                        <button className='p-2 rounded-md' onClick={()=>onDeleteClienteClick(cliente.id)}>
                            <TrashIcon/>
                        </button>
                    </li>)}
            </ul>
        </div>
    );
}