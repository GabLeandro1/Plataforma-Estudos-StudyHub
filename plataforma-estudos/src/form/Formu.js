import styles from '../components/Form.module.css' 

function Form() {
    return (
        <form className={styles.formularioInicioTopo}>
            <label for="email">E-mail</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                autocomplete="username" 
                placeholder="seu@email.com" 
                required 
            />
            <label for="senha">Senha</label>
            <input 
                type="password" 
                id="senha" 
                name="senha" 
                autocomplete="current-password" 
                placeholder="Digite sua senha" 
                required 
            />
            <button type="submit">Entrar</button>
            <div className={styles.formularioInicioBaixo}>
                <b><a href=''>Não tem uma conta?</a></b>
                <b><a href=''>Esqueceu a senha?</a></b>
            </div>
        </form>
    )
}

export default Form;