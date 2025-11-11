'use client';

import { deleteUsuario} from '@/service/usuario';
import { ReqUsuario} from '@/types';
import { Pencil, TrashIcon } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react';

export default function UsuarioList(props){
    const [usuarios, setUsuarios] = useState(props?.usuarios)

    function onDeleteUsuarioClick(usuarioId: number){
        const msg = deleteUsuario(usuarioId);
        const newUsuarios = usuarios.filter((usuario:any) => usuario.id!=usuarioId);
        setUsuarios(newUsuarios)
    }
   
    return(
        <div>
            <div className='rounded-md bg-blue-400 pb-2 pt-2 mb-3 w-25'>
            <Link href={"/home/usuario/form"} className='text-black'>
            <button className='w-full p-'>Criar +</button>
            </Link>
            </div>
            <ul className='space-y-2 w-[700px] p-2 bottom-0 rounded-md'>
                <li className='flex justify-start gap-2'>
                    <div className='bg-amber-400 p-2 w-[160px] rounded-md text-center'><b>NOME</b></div>
                    <div className='bg-amber-400 p-2 w-[200px] rounded-md text-center'><b>EMAIL</b></div>
                    <div className='bg-amber-400 p-2 w-[200px] rounded-md text-center'><b>PERMISSÃO</b></div>
                    <div className='bg-amber-400 p-2 w-[100px] rounded-md text-center'><b>AÇÕES</b></div>
                </li>
            </ul>
            <ul className='space-y-2 w-[700px] bg-amber-50 p-2 rounded-md'>
                {(usuarios).map((usuario: ReqUsuario)=>
                    <li key={usuario.id} className='flex gap-2'>
                        <div className={`bg-amber-400 p-2 w-75 flex rounded-md text-left`}>
                            {usuario.nome}
                        </div>
                        <div className='bg-amber-400 p-2 w-full rounded-md text-left'>
                            {usuario.email}
                        </div>
                        <div className='bg-amber-400 p-2 w-full rounded-md text-left'>
                            {(usuario.administrador)?"Administrador":"Comum"}
                        </div>
                        <Link href={`/home/usuario/form?nome=${usuario.nome}&email=${usuario.email}&administrador=${usuario.administrador}&id=${usuario.id}`} className='text-black'>
                        <button className='p-2 rounded-md'>
                            <Pencil/>
                        </button>
                        </Link>
                        <button className='p-2 rounded-md' onClick={()=>onDeleteUsuarioClick(usuario.id)}>
                            <TrashIcon/>
                        </button>
                    </li>)}
            </ul>
        </div>
    );
}