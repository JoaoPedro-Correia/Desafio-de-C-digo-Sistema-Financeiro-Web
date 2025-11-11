import { getUsuarios } from '@/service/usuario'
import UsuarioList from './list'

export default async function Usuario() {
    const usuarios = await getUsuarios()

    return (
        <div className='w-screen h-screen bg-gray-100 text-center flex justify-center p-6'>
            <UsuarioList usuarios={usuarios} >
                </UsuarioList>                        
        </div>
    );
}