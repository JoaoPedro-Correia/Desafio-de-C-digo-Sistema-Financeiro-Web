'use client';

import { createClientes, updateClientes} from '@/service/cliente'
import { Cliente } from '@/types';
import {useRouter, useSearchParams} from 'next/navigation'
import {useState} from 'react'

export default function ClienteForm(){
    const router = useRouter();
    const params = useSearchParams();
    const initiAtivo = params?.get("ativo");

    const [nome, setNome] = useState(params?.has("nome")? params?.get("nome"):"");
    const [email, setEmail] = useState(params?.has("email")? params?.get("email"):"");
    const [telefone, setTelefone] = useState(params?.has("telefone")? params?.get("telefone"):"");
    const [ativo, setAtivo] = useState(initiAtivo === "true" || initiAtivo === "1" || initiAtivo === null ? true : false);

    // alert(params?.get("ativo"));    
    const onChangeCheckBox = () => {
        setAtivo(!ativo);
        console.log(ativo)
    }

    function createCliente(){
        // alert(nome+", "+email+", "+telefone+", "+ativo)
        const client: Cliente = {
            nome: nome,
            email: email,
            telefone: telefone,
            ativo: ativo,
        };

        if(params?.has("id") && params?.get("id")!==undefined){
            const id = params?.get("id");
            const msg = updateClientes(id, client);
            msg.then((status)=>{
                if(status==204){
                    alert("Cliente atualizado com sucesso!")
                    router.push("/home/cliente")
                }else
                    alert("Erro ao atualizar cliente")
                });
        }else{
            const msg = createClientes(client);
            msg.then((status)=>{
                if(status==201)
                    alert("Cliente Criado com sucesso!")
                else
                    alert("Erro ao criar cliente")
                });
        }
        setNome("");
        setEmail("");
        setTelefone("");
    }
    return(
        <div className='bg-gray-100 w-screen h-screen'>
        <div className='row p-6 flex'>
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Nome</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control" id="Nome" name='nome'/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="Email" name='email'/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Telefone</label>
                <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="form-control" id="Telefone" name='telefone'/>
            </div>
            <div className="form-check m-3">
                <input className="form-check-input" type="checkbox" defaultChecked={(!ativo? undefined:true)} onChange={onChangeCheckBox} id="ativo" name='ativo'/>
                <label className="form-check-label" htmlFor="ativo">
                Ativo
                </label>
            </div>
            <div className='flex justify-center'>
                <button type="submit" className="btn btn-primary w-25" onClick={()=>{
                    if(!nome?.trim() || !email?.trim() || !telefone?.trim()){
                        return alert("Você precisa preencher todos os campos");
                    }
                    createCliente()
                }}>Criar cliente</button>
            </div>
        </div>
        </div>
    );
}