import { getOrdens } from '@/service/ordem'
import OrdemList from './list';

export default async function Ordem(){
    const ordem = await getOrdens()

    return (
        <div className='w-screen h-screen bg-gray-100 text-center flex justify-center p-6'>
            <OrdemList ordem={ordem} >
                </OrdemList>                        
        </div>
    );
} 