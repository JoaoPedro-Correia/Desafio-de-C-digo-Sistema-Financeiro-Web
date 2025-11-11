'use client';

import { createUsuario, updateUsuario} from '@/service/usuario'
import { ResUsuario } from '@/types';
import {useRouter, useSearchParams} from 'next/navigation'
import {useState} from 'react'

export default function UsuarioForm(){
    const router = useRouter();
    const params = useSearchParams();
    const initiAdm = params?.get("administrador");

    const [nome, setNome] = useState(params?.has("nome")? params?.get("nome"):"");
    const [email, setEmail] = useState(params?.has("email")? params?.get("email"):"");
    const [senha, setSenha] = useState("");
    const [administrador, setAdministrador] = useState(initiAdm === "true" || initiAdm === "1" || initiAdm === null ? true : false);

    // alert(params?.get("ativo"));    
    const onChangeCheckBox = () => {
        setAdministrador(!administrador);
    }

    function sendUsuario(){
        const resusuario: ResUsuario = {
            nome: nome,
            email: email,
            senha: senha,
            administrador: administrador,
        };

        if(params?.has("id") && params?.get("id")!==undefined){
            const id = params?.get("id");
            const msg = updateUsuario(Number(id), resusuario);
            msg.then((status)=>{
                if(status==204){
                    alert("Usuario atualizado com sucesso!")
                    router.push("/home/usuario")
                }else
                    alert("Erro ao atualizar usuario")
                });
        }else{
            console.log(resusuario)
            if(!senha?.trim())
                return alert("O campo senha precisa ser preenchido.")

            const msg = createUsuario(resusuario);
            msg.then((status)=>{
                if(status==201)
                    alert("Usuario criado com sucesso!")
                else
                    alert("Erro ao criar usuario")
                });
        }
        setNome("");
        setEmail("");
        setSenha("");
    }
    return(
        <div className='bg-gray-100 w-screen h-screen'>
        <div className='row p-6 flex'>
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Nome</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control" id="Nome" name='nome'/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="Email" name='email'/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Nova Senha (Opcional)</label>
                <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)} className="form-control" id="Telefone" name='telefone'/>
            </div>
            <div className="form-check m-3">
                <input className="form-check-input" type="checkbox" defaultChecked={(!administrador? undefined:true)} onChange={onChangeCheckBox} id="ativo" name='ativo'/>
                <label className="form-check-label" htmlFor="ativo">
                Administrador
                </label>
            </div>
            <div className='flex justify-center'>
                <button type="submit" className="btn btn-primary w-25" onClick={()=>{
                    if(!nome?.trim() || !email?.trim()){
                        return alert("Você precisa preencher todos os campos");
                    }
                    sendUsuario()
                }}>Criar Usuario</button>
            </div>
        </div>
        </div>
    );
}