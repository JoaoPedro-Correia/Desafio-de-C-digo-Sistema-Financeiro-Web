'use client';

import Link from "next/link";

export function Header() {
    return (
        <header className="flex">
            <Link href="/home"> 
                <h1>Meu Header</h1>
            </Link>

            <div className="flex gap-2 mb-2">
                <Link href="/home/dashboard"> 
                    <button className="bg-blue-500 text-white p-2">Dashboard</button>
                </Link>
                <Link href="/home/usuario"> 
                <button className="bg-blue-500 text-white p-2">Usuario</button>
                </Link>
                <Link href="/home/ordem"> 
                <button className="bg-blue-500 text-white p-2">Ordem</button>
                </Link>
                <Link href="/home/cliente"> 
                <button className="bg-blue-500 text-white p-2">Cliente</button>
                </Link>
            </div>
        </header>
    )
}
