'use client';

import { createClientes} from '@/service/cliente'
import { Cliente } from '@/types';
import { register } from 'module';
import {useParams} from 'next/navigation'
import {useState} from 'react'

export default function ClienteForm(){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [ativo, setAtivo] = useState(true);

    const params = useParams();
    params

    const onChangeCheckBox = () => {
        setAtivo(!ativo);
        alert(ativo)
    }

    function createCliente(){
        alert(nome+", "+email+", "+telefone+", "+ativo)
        let client: Cliente;
    }
    return(
        <div>
        <form action="cliente" method="post" onSubmit={createCliente} className='row p-4 flex'>
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
                <input className="form-check-input" type="checkbox" value={ativo.valueOf().toString()} defaultChecked={ativo} onChange={onChangeCheckBox} id="ativo" name='ativo'/>
                <label className="form-check-label" htmlFor="ativo" onClick={()=> {
                    if(!nome.trim() || !email.trim() || !telefone.trim()){
                        return alert("Você precisa preencher todos os campos")
                    }
                }}>
                Ativo
                </label>
            </div>
            <button type="submit" className="btn btn-primary w-25 items-center" >Criar cliente</button>
        </form>
        </div>
    );
}