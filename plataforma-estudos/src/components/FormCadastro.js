import styles from '../components/Form.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const cadastrarUsuario = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const resposta = await fetch("http://localhost:3000/alunos/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });

            if (!resposta.ok) {
                throw new Error("Falha no login");
            }
            const dados = await resposta.json();

            if (dados.msg == 'Aluno criado com sucesso.') {
                navigate("/");
            } else {
                setErro("Ocorreu um problema interno.");
            }

        } catch (err) {
            setErro("Ocorreu um problema interno.");
            console.log(err);
        }
    };

    return (
        <form className={styles.formularioInicioTopo} onSubmit={cadastrarUsuario}>
            {erro && <p className={styles.error}>{erro}</p>}

            <label htmlFor="email">Digite seu nome</label>
            <input
                type="nome"
                id="nome"
                name="email"
                autoComplete="username"
                placeholder="seu nome"
                onChange={(e) => setNome(e.target.value)}
                required
            />

            <label htmlFor="email">Digite seu e-mail</label>
            <input
                type="email"
                id="email"
                name="email"
                autoComplete="username"
                placeholder="seu@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="senha">Digite sua senha</label>
            <input
                type="password"
                id="senha"
                name="senha"
                autoComplete="current-password"
                placeholder="Digite sua senha"
                onChange={(e) => setSenha(e.target.value)}
                required
            />

            <button type="submit">Cadastrar</button>
        </form>
    );
}

export default Cadastro;