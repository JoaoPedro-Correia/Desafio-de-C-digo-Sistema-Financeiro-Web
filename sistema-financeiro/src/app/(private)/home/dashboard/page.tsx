'use client';

import { useState, useEffect, useMemo } from 'react';
// Substitua pelos seus serviços reais
import { getClientes } from '@/service/cliente'; 
import { getOrdens } from '@/service/ordem'; 
import {Ordem,Cliente} from '@/types' 

// Importa os ícones do Lucide React para um visual melhor
import { UserCheck, UserX, DollarSign } from 'lucide-react';
import { error } from 'console';

export default function FinanceiroDashboard() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [ordens, setOrdens] = useState<Ordem[]>([]);
    const [loading, setLoading] = useState(true);

    // Função para carregar todos os dados da API
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const fetchedClientes = await getClientes();
                const fetchedOrdens = await getOrdens(); 
                
                setClientes(fetchedClientes || []);
                setOrdens(fetchedOrdens || []);

            } catch (error) {
                console.error("Erro ao carregar dados do dashboard:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // --- Lógica de Processamento de Dados (useMemo) ---
    const dashboardData = useMemo(() => {
        if (loading) return null;

        const agora = new Date();
        const mesAtual = agora.getMonth();
        const anoAtual = agora.getFullYear();

        // 1. Quantidade total de clientes ativos
        const clientesAtivos = clientes.filter(c => c.ativo);
        const totalClientesAtivos = clientesAtivos.length;

        // Mapeamento de Ordem de Pagamento por Cliente para verificar adimplência
        const clienteAdimplencia = clientesAtivos.reduce((acc, cliente) => {
            acc[cliente.id] = {
                // Se o cliente tem alguma ordem ATIVA (data_pagamento == null)
                status: 'ADIMPLENTE', // Padrão
                pendente: false
            };
            return acc;
        }, {} as { [key: number]: { status: string, pendente: boolean } });


        // Variáveis financeiras e pendências
        let totalPago = 0;
        let recebidoMesAtual = 0;
        let clientesPendentesCount = 0;
        const clientesPendentesIds: Set<number> = new Set();


        ordens.forEach(ordem => {
            const valorNumerico = parseFloat(ordem.valor.toString() || '0');
            const dataPagamento = ordem.data_pagamento ? new Date(ordem.data_pagamento) : null;
            
            // Verifica pendência
            if (!dataPagamento) {
                // Se a ordem não está paga, o cliente é pendente
                if (!clientesPendentesIds.has(ordem.cliente_id)) {
                    clientesPendentesIds.add(ordem.cliente_id);
                    clientesPendentesCount++;
                }
                if (clienteAdimplencia[ordem.cliente_id]) {
                    clienteAdimplencia[ordem.cliente_id].status = 'PENDENTE';
                    clienteAdimplencia[ordem.cliente_id].pendente = true;
                }

            }
            
            // Verifica pagamentos
            if (dataPagamento) {
                totalPago += valorNumerico;

                // 3. Valor total recebido no mês atual
                if (dataPagamento.getMonth() === mesAtual && dataPagamento.getFullYear() === anoAtual) {
                    recebidoMesAtual += valorNumerico;
                }
            }
        });
        
        return {
            totalClientesAtivos,
            totalClientesPendentes: clientesPendentesCount,
            totalPago: totalPago.toFixed(2),
            recebidoMesAtual: recebidoMesAtual.toFixed(2),
            clientesAtivosComStatus: clientesAtivos.map(c => ({
                ...c,
                adimplencia: clienteAdimplencia[c.id]?.status || 'SEM ORDEM' // Adiciona o status de adimplência
            }))
        };
    }, [clientes, ordens, loading]);
    
    // --- Renderização ---

    if (loading) return <div className="text-center p-8">Carregando Dashboard...</div>;
    if (!dashboardData) return <div className="text-center p-8 text-red-600">Erro ao processar dados.</div>;
    
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Painel Financeiro</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                
                {/* Cartão 1: Clientes Ativos */}
                <Card 
                    title="Clientes Ativos" 
                    value={dashboardData.totalClientesAtivos} 
                    icon={UserCheck} 
                    color="bg-green-500" 
                />
                
                {/* Cartão 2: Clientes Pendentes */}
                <Card 
                    title="Clientes Pendentes" 
                    value={dashboardData.totalClientesPendentes} 
                    icon={UserX} 
                    color="bg-red-500" 
                />

                {/* Cartão 3: Valor Total Pago (Histórico) */}
                <Card 
                    title="Valor Total Pago" 
                    value={`R$ ${dashboardData.totalPago}`} 
                    icon={DollarSign} 
                    color="bg-blue-500" 
                />

                {/* Cartão 4: Recebido no Mês */}
                <Card 
                    title="Recebido Mês Atual" 
                    value={`R$ ${dashboardData.recebidoMesAtual}`} 
                    icon={DollarSign} 
                    color="bg-yellow-500" 
                />
            </div>

            {/* --- Listagem de Clientes Ativos --- */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Clientes Ativos e Status</h2>
            <ClientList clientes={dashboardData.clientesAtivosComStatus} />

        </div>
    );
}

// --- Componentes Auxiliares ---

// Componente Card para os totais
const Card = ({ title, value, icon: Icon, color }) => (
    <div className={`${color} text-white p-5 rounded-lg shadow-lg flex items-center justify-between`}>
        <div>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <Icon size={40} className="opacity-50" />
    </div>
);

// Componente Tabela/Lista de Clientes
const ClientList = ({ clientes }) => (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status Adimplência</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {clientes.map(cliente => (
                    <tr key={cliente.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.telefone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span 
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${cliente.adimplencia === 'PENDENTE' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                            >
                                {cliente.adimplencia}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);