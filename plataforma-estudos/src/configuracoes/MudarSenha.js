
import { useState } from "react";
import styles from "./MudarSenha.module.css";
import { requisicaoComToken } from '../services/api';

function MudarSenha() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (novaSenha !== confirmarSenha) {
      return setErro("As senhas não coincidem.");
    }

    if (novaSenha.length < 6) {
      return setErro("A nova senha deve ter pelo menos 6 caracteres.");
    }

    const token = localStorage.getItem("token");
    const dados = JSON.parse(localStorage.getItem("dados"));
    const idAluno = dados?.id_aluno;

    if (!token || !idAluno) {
      return setErro("Sessão expirada. Faça login novamente.");
    }

    try {
      setCarregando(true);
        
      const resposta = await requisicaoComToken(`/alunos/${idAluno}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });

      const json = await resposta.json();

      if (json.status) {
        setSucesso("Senha atualizada com sucesso!");
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
      } else {
        setErro(json.msg || "Erro ao atualizar senha.");
      }
    } catch (err) {
      console.error(err);
      setErro("Erro ao se comunicar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formSenha}>
      <h2 className={styles.titulo}>
        Mudar Senha
      </h2>

      <div className={styles.grupoCampo}>
        <label className={styles.label}>
          Senha atual
        </label>

        <input
          type="password"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.grupoCampo}>
        <label className={styles.label}>
          Nova senha
        </label>

        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.grupoCampo}>
        <label className={styles.label}>
          Confirmar nova senha
        </label>

        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      {erro && (
        <p className={styles.mensagemErro}>
          {erro}
        </p>
      )}

      {sucesso && (
        <p className={styles.mensagemSucesso}>
          {sucesso}
        </p>
      )}

      <button
        type="submit"
        disabled={carregando}
        className={styles.botaoSalvar}
      >
        {carregando ? "Salvando..." : "Salvar nova senha"}
      </button>
    </form>
  );
}

export default MudarSenha;