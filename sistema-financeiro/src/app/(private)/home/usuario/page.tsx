import { getUsuarios } from '@/service/usuario'
import { columnsUsuario } from '@/app/(private)/home/columns'
import {DataTable} from '@/components/ui/data_table'

export default async function Usuario() {
    const data = await getUsuarios()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <DataTable columns={columnsUsuario} data={data} />
        </main>
    );
}