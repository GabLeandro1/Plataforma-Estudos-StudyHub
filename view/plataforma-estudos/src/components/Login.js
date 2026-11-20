import styles from '../components/Form.module.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Login({ setLogado }) {
    console.log("setLogado:", setLogado);
    console.log("Tipo:", typeof setLogado);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('dados');
        localStorage.removeItem('token');
    }, []);
    const validarUsuario = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const resposta = await fetch("http://localhost:3000/alunos/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ email, senha }),
            });

            if (!resposta.ok) {
                throw new Error("Falha no login");
            }

            const dados = await resposta.json();

            if (dados.token) {
                localStorage.setItem("token", dados.token);
                localStorage.setItem("dados", JSON.stringify(dados.aluno));
                setLogado(true);
                navigate("/menu/aluno");
            } else {
                setErro("Token não recebido.");
            }

        } catch (err) {
            setErro("E-mail ou senha inválidos.");
            console.log(err);
        }
    };

    return (
        <form className={styles.formularioInicioTopo} onSubmit={validarUsuario}>
            {erro && <p className={styles.error}>{erro}</p>}
            <div className={styles.loginCabecalho}>
                <p>Entre na sua conta para continuar estudando.</p>
            </div>
            <div className={styles.campo}>
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
            </div>

            <button type="submit" className={styles.botaoEntrar}>
                Entrar
            </button>

            <div className={styles.formularioInicioBaixo}>
                <a onClick={() => navigate('/cadastro')}>
                    Não tem uma conta?
                </a>

                <a onClick={() => navigate('/recuperar-senha')}>
                    Esqueceu a senha?
                </a>
            </div>
        </form>
    );
}

export default Login;