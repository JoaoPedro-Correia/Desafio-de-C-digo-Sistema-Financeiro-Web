export default async function UsuarioForm() {
    return (
        <div className="centered-container">
            <div>
                <form className="mb-8" method="post">
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" name="nome" placeholder="Nome" />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email </label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" name="email" placeholder="Email" />
                    </div>
                </div>

                <div className="mb-3 ">
                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                    <input type="password" id="inputPassword5" className="form-control" name="senha" aria-describedby="passwordHelpBlock" />
                </div> 
                
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="1" name="administrador" id="checkDefault" />
                    <label className="form-check-label" htmlFor="checkDefault">
                        Administrador
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}