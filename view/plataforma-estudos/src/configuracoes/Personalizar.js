
import { useState, useEffect } from "react";
import styles from './Personalizar.module.css';
import { requisicaoComToken } from '../services/api';
import ImagemPerfil from "../layout/ImagemPerfil";

function Personalizar() {
    const [mensagem, setMensagem] = useState("");
    const [idAluno, setIdAluno] = useState(null);
    const [imagemPerfil, setImagemPerfil] = useState(null);
    const [previewImagem, setPreviewImagem] = useState(null);
    const [imagemAtual, setImagemAtual] = useState(null);

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem("dados") || "{}");

        setIdAluno(dados.id_aluno);

        if (dados.imagem_perfil) {
            setImagemAtual(dados.imagem_perfil);
        }
    }, []);

    function handleImagemChange(event) {
        const arquivo = event.target.files[0];

        if (!arquivo) return;

        if (!["image/jpeg", "image/png", "image/webp"].includes(arquivo.type)) {
            setMensagem("Formato de imagem não permitido.");
            return;
        }

        if (arquivo.size > 5 * 1024 * 1024) {
            setMensagem("A imagem deve ter no máximo 5 MB.");
            return;
        }

        setImagemPerfil(arquivo);

        const preview = URL.createObjectURL(arquivo);
        setPreviewImagem(preview);

        setMensagem("");
    }

    async function handleSalvar() {
        setMensagem("");

        const token = localStorage.getItem("token");

        if (!token || !idAluno) {
            setMensagem("Sessão expirada. Faça login novamente.");
            return;
        }

        if (!imagemPerfil) {
            setMensagem("Selecione uma imagem primeiro.");
            return;
        }

        try {
            const formulario = new FormData();
            formulario.append("imagem", imagemPerfil);

            const resposta = await requisicaoComToken(
                `/alunos/${idAluno}/imagem`,
                {
                    method: "PUT",
                    body: formulario
                }
            );

            const json = await resposta.json();

            if (!resposta.ok || !json.status) {
                setMensagem(json.msg || "Erro ao atualizar imagem.");
                return;
            }

            setImagemAtual(previewImagem);

            window.dispatchEvent(
                new CustomEvent('atualizarImagemPerfil', {
                    detail: previewImagem
                })
            );

            setImagemPerfil(null);
            setPreviewImagem(null);

            setMensagem("Imagem atualizada com sucesso!");

        } catch (error) {
            console.error("Erro ao atualizar imagem:", error);
            setMensagem("Erro ao se comunicar com o servidor.");
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>
                Personalizar
            </h2>

            <div className={styles.campo}>
                <label className={styles.label}>
                    Mudar foto de perfil
                </label>

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImagemChange}
                    className={styles.inputArquivo}
                />

                <ImagemPerfil
                    imagemPerfil={previewImagem || imagemAtual}
                    className={styles.preview}
                />
            </div>

            {mensagem && (
                <p className={styles.mensagem}>
                    {mensagem}
                </p>
            )}

            <button
                onClick={handleSalvar}
                className={styles.botao}
            >
                Salvar imagem
            </button>
        </div>
    );
}

export default Personalizar;
