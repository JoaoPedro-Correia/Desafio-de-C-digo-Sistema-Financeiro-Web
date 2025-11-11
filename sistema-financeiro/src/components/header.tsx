'use client';

import Link from "next/link";

export function Header() {

    return (
        <header className="flex justify-between ">
            <Link href="/home" className="p-6"> 
                <h1>Bem vindo!</h1>
            </Link>

            <div className="flex justify-end gap-2 p-6">
                <Link href="/home/dashboard"> 
                    <button className="text-gray-800 p-2 rounded-b-md">Dashboard</button>
                </Link>
                <Link href="/home/usuario"> 
                    <button className="text-gray-800 p-2">Usuario</button>
                </Link>
                <Link href="/home/ordem"> 
                <button className="text-gray-800 p-2">Ordem</button>
                </Link>
                <Link href="/home/cliente"> 
                <button className="text-gray-800 p-2">Cliente</button>
                </Link>
            </div>
        </header>
    )
}
