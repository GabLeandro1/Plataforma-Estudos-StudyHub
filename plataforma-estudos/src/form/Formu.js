import styles from '../components/Form.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Form() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const validarUsuario = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const resposta = await fetch("http://localhost:3000/alunos/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            if (!resposta.ok) {
                throw new Error("Falha no login");
            }
            const dados = await resposta.json();

            if (dados.token) {
                localStorage.setItem("token", dados.token);
                localStorage.setItem("dados", JSON.stringify(dados.aluno));
                navigate("/menu/aluno");
            } else {
                setErro("Token não recebido.");
            }

        } catch (err) {
            setErro("Email ou senha inválidos.");
            console.log(err);
        }
    };

    return (
        <form className={styles.formularioInicioTopo} onSubmit={validarUsuario}>
            {erro && <p className={styles.error}>{erro}</p>}

            <label htmlFor="email">E-mail</label>
            <input
                type="email"
                id="email"
                name="email"
                autoComplete="username"
                placeholder="seu@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="senha">Senha</label>
            <input
                type="password"
                id="senha"
                name="senha"
                autoComplete="current-password"
                placeholder="Digite sua senha"
                onChange={(e) => setSenha(e.target.value)}
                required
            />

            <button type="submit">Entrar</button>

            <div className={styles.formularioInicioBaixo}>
                <b><a href="">Não tem uma conta?</a></b>
                <b><a href="">Esqueceu a senha?</a></b>
            </div>
        </form>
    );
}

export default Form;