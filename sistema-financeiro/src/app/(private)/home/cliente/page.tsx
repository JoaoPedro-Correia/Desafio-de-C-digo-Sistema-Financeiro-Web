import ClienteList from './list'
import ClienteForm from './form/page';
import { deleteClientes, getClientes } from '@/service/cliente'
import { log } from 'console';

export default async function ClienteHome() {
    const clientes = await getClientes();

    return (
        <div className='w-screen h-screen bg-gray-100 text-center flex justify-center p-6'>
            <ClienteList clientes={clientes}></ClienteList>                        
        </div>
    );
}