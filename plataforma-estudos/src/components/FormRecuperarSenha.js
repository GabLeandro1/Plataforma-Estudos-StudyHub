import styles from '../components/Form.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { requisicaoComToken } from '../services/api';

function FormRecuperarSenha() {
    const [email, setEmail] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const recuperarSenha = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const resposta = await requisicaoComToken("http://localhost:3000/alunos/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ email }),
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
        <form className={styles.formularioInicioTopo} onSubmit={recuperarSenha}>
            {erro && <p className={styles.error}>{erro}</p>}
            <div className={styles.campo}>
                <label htmlFor="email">Para recuperar sua senha, informe seu endereço de email que nós enviaremos um link para a alteração de senha.</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="username"
                    placeholder="seu@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className={styles.botaoEntrar}>Enviar</button>
        </form>
    );
}

export default FormRecuperarSenha;