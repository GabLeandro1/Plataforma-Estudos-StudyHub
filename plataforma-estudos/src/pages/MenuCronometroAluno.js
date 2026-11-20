import styles from './MenuCronometroAluno.module.css';
import { useNavigate } from "react-router-dom";

function MenuCronometroAluno() {
    const navigate = useNavigate();
    const dados =  JSON.parse(localStorage.getItem("dados"));
    const nomeUsuario = dados?.nome || "estudante";
    return (
        <section className={styles.menu_container}>
            <div className={styles.menu_conteudo}>
                <h1>
                    Olá {nomeUsuario}! Seja bem-vindo(a) ao <span>StudyHub!</span>
                </h1>

                <p className={styles.subtitulo}>
                    Organize seu tempo e torne seus estudos mais produtivos.
                </p>

                <div className={styles.opcoes}>
                    <button
                        className={styles.opcao}
                        onClick={() => navigate("/menu/aluno/cronometro/pomodoro")}
                    >
                        <span className={styles.icone}>🍅</span>
                        <h2>Pomodoro</h2>
                        <p>Estude em períodos de foco intercalados com pausas.</p>
                        <span className={styles.acao}>Começar →</span>
                    </button>

                    <button
                        className={styles.opcao}
                        onClick={() => navigate("/menu/aluno/cronometro/cronometro-regressivo")}
                    >
                        <span className={styles.icone}>⏳</span>
                        <h2>Cronômetro regressivo</h2>
                        <p>Defina um tempo limite para sua sessão de estudos.</p>
                        <span className={styles.acao}>Começar →</span>
                    </button>

                    <button
                        className={styles.opcao}
                        onClick={() => navigate("/menu/aluno/cronometro/cronometro-progressivo")}
                    >
                        <span className={styles.icone}>⏱️</span>
                        <h2>Cronômetro progressivo</h2>
                        <p>Acompanhe quanto tempo você dedica aos estudos.</p>
                        <span className={styles.acao}>Começar →</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default MenuCronometroAluno;