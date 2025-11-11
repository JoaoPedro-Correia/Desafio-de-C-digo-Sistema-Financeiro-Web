'use client';

import { createOrdem, updateOrdem} from '@/service/ordem'
import { getClientes } from '@/service/cliente'
import { Cliente, Ordem } from '@/types';
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'; // 👈 Correção: Importar apenas 'DatePicker'
import 'react-datepicker/dist/react-datepicker.css';

export default function OrdemForm(){
    const router = useRouter();
    const params = useSearchParams();
    
    // Função auxiliar para converter string de data em objeto Date
    const getDateValue = (paramName: string, defaultValue: Date | null) => {
        const paramValue = params?.get(paramName);
        if (paramValue) {
            // Cria um objeto Date. É importante que a string seja em formato ISO (YYYY-MM-DD)
            return new Date(paramValue); 
        }
        return defaultValue;
    };

    const [descricao, setDescricao] = useState(params?.has("descricao")? params?.get("descricao"):"");
    const [valor, setValor] = useState(params?.has("valor")? params?.get("valor"):"");
    
    // Inicialização CORRIGIDA: garante que o estado seja Date ou null
    const [dataInicio, setDataInicio] = useState<Date | null>(getDateValue("datainicio", new Date()));
    const [dataFim, setDataFim] = useState<Date | null>(getDateValue("datafim", new Date()));
    const [dataPagamento, setDataPagamento] = useState<Date | null>(getDateValue("datapagamento", null));
    
    const [clienteId, setClienteId] = useState(params?.has("clienteid")? params?.get("clienteid"):"");
    const [clientes, setCliente] = useState<Cliente[]>([]);

    useEffect(() => {
        async function fetchClientes() {
            setCliente(await getClientes());
        }
        fetchClientes();
    }, [])

    function sendOrdem(){
        if(descricao==null)
            return
        
        const ordem: Ordem = {
            descricao: descricao,
            valor: Number(valor),
            data_inicio: dataInicio ? dataInicio : undefined, // Exemplo de formatação para string
            data_fim: dataFim ? dataFim : undefined,
            data_pagamento: dataPagamento ? dataPagamento : undefined,
            cliente_id: Number(clienteId),
        };

        if(params?.has("id") && params?.get("id")!==undefined){
            const id = params?.get("id");
            const msg = updateOrdem(Number(id), ordem);
            msg.then((status)=>{
                if(status==204){
                    alert("Ordem atualizada com sucesso!")
                    router.push("/home/ordem")
                }else
                    alert("Erro ao atualizar ordem")
                });
        }else{
            const msg = createOrdem(ordem);
            msg.then((status)=>{
                if(status==201)
                    alert("Ordem criada com sucesso!")
                else
                    alert("Erro ao criar ordem")
                });
        }
        // Limpar os campos
        setDescricao("");
        setValor("");
        setDataInicio(null);
        setDataFim(null);
        setDataPagamento(null);
        setClienteId("");
    }
    return(
        <div className='bg-gray-100 w-screen h-screen'>
        <div className='row p-6 flex'>
            <div className="col-md-8 mt-2">
                <label htmlFor="inputText4" className="form-label">Descricao</label>
                <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="form-control" id="descricao" name='descricao'/>
            </div>
            <div className="col-md-4 mt-2">
                <label htmlFor="inputNumber4" className="form-label">Valor</label>
                <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} className="form-control" id="valor" name='valor'/>
            </div>
            <div className="col-md-4 mt-2">
                <label htmlFor="inputDate4" className="form-label">Data Inicio</label>
                <DatePicker 
                    selected={dataInicio} 
                    onChange={(date: Date) => setDataInicio(date)} 
                    className='border-2 bg-amber-50' 
                />
            </div>
            <div className="col-md-4 mt-2">
                <label htmlFor="inputDate4" className="form-label">Data Fim</label>
                <DatePicker 
                    selected={dataFim} 
                    onChange={(date: Date) => setDataFim(date)} 
                    className='border-2 bg-amber-50' 
                />
            </div>
            
            {/* <div className="col-md-4 mt-2">
                <label htmlFor="inputDate4" className="form-label">Data Pagamento</label>
                <DatePicker 
                    selected={params?.has("datapagamento")? dataPagamento} 
                    onChange={(date: Date) => setDataPagamento(date)} 
                    isClearable // Permite limpar a data
                    className='border-2 bg-amber-50' 
                />
            </div> */}

            <div className='col-md-6 left-0 mt-2'>
            <label htmlFor="" className="form-label">Cliente</label>
            <select 
                className="form-select" 
                aria-label="Default select example" 
                value={clienteId} // Adicione value para controle
                onChange={(e)=>setClienteId(e.target.value)}
            >
                <option value="">Selecione um Cliente</option> 
                {clientes.map((cliente:Cliente)=>
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                )}
            </select>
            </div>

            <div className='flex justify-center p-4'>
                <button type="submit" className="btn btn-primary w-25" onClick={()=>{
                    if(!descricao?.trim() || !valor?.trim() || !dataInicio || !dataFim || !clienteId){
                        return alert("Você precisa preencher todos os campos");
                    }
                    sendOrdem()
                }}>{params?.has("id") ? "Atualizar" : "Criar"} Ordem</button>
            </div>
        </div>
        </div>
    );
}