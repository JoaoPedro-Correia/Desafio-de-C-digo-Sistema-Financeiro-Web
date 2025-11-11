import ClienteList from './list'
import { getClientes, getClientesAdimplentes} from '@/service/cliente'

export default async function ClienteHome() {
    const clientes = await getClientes();
    const adimplentes = await getClientesAdimplentes();

    return (
        <div className='w-screen h-screen bg-gray-100 text-center flex justify-center p-6'>
            <ClienteList clientes={clientes} adimplentes={adimplentes} >
                </ClienteList>                        
        </div>
    );
}