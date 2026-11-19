import { useState } from "react";
import { requisicaoComToken } from '../services/api';

function Personalizar() {
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
    const matricula = dados?.Matricula;

    if (!token || !matricula) {
      return setErro("Sessão expirada. Faça login novamente.");
    }

    try {
      setCarregando(true);
      const resposta = await fetch(`http://localhost:3000/alunos/${matricula}`, {
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
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Mudar Senha
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Senha atual
        </label>
        <input
          type="password"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nova senha
        </label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Confirmar nova senha
        </label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {erro && <p className="text-red-500">{erro}</p>}
      {sucesso && <p className="text-green-500">{sucesso}</p>}

      <button
        type="submit"
        disabled={carregando}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
      >
        {carregando ? "Salvando..." : "Salvar nova senha"}
      </button>
    </form>
  );
}

export default Personalizar;