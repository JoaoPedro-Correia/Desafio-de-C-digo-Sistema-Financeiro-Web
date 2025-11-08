import { getOrdens } from '@/service/ordem'
import { columnsOrdem } from '@/app/(private)/home/columns'
import {DataTable} from '@/components/ui/data_table'

export default async function Ordem(){
    const data = await getOrdens()

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <DataTable columns={columnsOrdem} data={data} />
        </main>
    );
} 