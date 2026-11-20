
import styles from './Historico.module.css';
import { useState, useEffect } from 'react';
import { requisicaoComToken } from '../services/api';

function Historico() {
    const [sessoes, setSessoes] = useState([]);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [filtro, setFiltro] = useState('todas');

    useEffect(() => {
        async function lerSessoes() {
            try {
                const aluno = JSON.parse(localStorage.getItem('dados'));
                const token = localStorage.getItem('token');

                if (!aluno || !aluno.id_aluno) {
                    throw new Error("Aluno não encontrado.");
                }

                const resposta = await requisicaoComToken(`/sessoes/aluno/${aluno.id_aluno}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: 'include'
                    }
                );

                if (!resposta.ok) {
                    throw new Error("Falha ao consultar sessões.");
                }

                const dados = await resposta.json();

                console.log("Sessões recebidas:", dados);

                if (dados.status && Array.isArray(dados.sessao)) {
                    setSessoes(dados.sessao);
                } else {
                    setSessoes([]);
                }

            } catch (err) {
                setErro("Não foi possível carregar seu histórico.");
                console.log(err);

            } finally {
                setCarregando(false);
            }
        }

        lerSessoes();
    }, []);

    function formatarTempo(segundos) {
        segundos = Number(segundos) || 0;

        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const segundosRestantes = segundos % 60;

        if (horas > 0) {
            return `${horas}h ${minutos}min ${segundosRestantes}s`;
        }

        if (minutos > 0) {
            return `${minutos}min ${segundosRestantes}s`;
        }

        return `${segundosRestantes}s`;
    }

    function formatarData(data) {
        if (!data) return "Data não disponível";

        const dataFormatada = new Date(
            data.toString().replace(' ', 'T')
        );

        if (isNaN(dataFormatada.getTime())) {
            return "Data inválida";
        }

        return "Data: " + dataFormatada.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    const tempoTotal = sessoes.reduce(
        (total, sessao) =>
            total + (Number(sessao.tempo_estudado) || 0),
        0
    );

    const sessoesFiltradas = sessoes.filter((sessao) => {
    if (filtro === 'todas') {
        return true;
    }

    const dataSessao = new Date(
        sessao.data.toString().replace(' ', 'T')
    );

    const hoje = new Date();

    // Remove as horas para comparar somente as datas
    hoje.setHours(0, 0, 0, 0);

    const dataComparacao = new Date(dataSessao);
    dataComparacao.setHours(0, 0, 0, 0);

    if (filtro === 'hoje') {
        return dataComparacao.getTime() === hoje.getTime();
    }

    if (filtro === '7dias') {
        const limite = new Date(hoje);
        limite.setDate(limite.getDate() - 6);

        return dataComparacao >= limite && dataComparacao <= hoje;
    }

    if (filtro === '30dias') {
        const limite = new Date(hoje);
        limite.setDate(limite.getDate() - 29);

        return dataComparacao >= limite && dataComparacao <= hoje;
    }

    return true;
});

    return (
        <section className={styles.container}>

            {carregando ? (
                <p>Carregando histórico...</p>
            ) : erro ? (
                <p className={styles.vazio}>{erro}</p>
            ) : (
                <>
                    <div className={styles.resumo}>

                        <div className={styles.card}>
                            <h3>Tempo total estudado</h3>
                            <p>{formatarTempo(tempoTotal)}</p>
                        </div>

                        <div className={styles.card}>
                            <h3>Sessões realizadas</h3>
                            <p>{sessoes.length}</p>
                        </div>

                    </div>

                    <h2>Suas sessões</h2>

                    {sessoes.length === 0 ? (

                        <p className={styles.vazio}>
                            Você ainda não possui sessões de estudo.
                        </p>

                    ) : (

                        <div className={styles.lista}>

                            {sessoes.map((sessao) => (
                                <article
                                    key={sessao.id_sessao}
                                    className={styles.sessao}
                                >
                                    <div>
                                        <h3>
                                            Sessão #{sessao.id_sessao}
                                        </h3>

                                        <p>
                                            {formatarData(sessao.data)}
                                        </p>
                                    </div>

                                    <span>
                                        {formatarTempo(
                                            sessao.tempo_estudado
                                        )}
                                    </span>

                                </article>
                            ))}

                        </div>

                    )}
                </>
            )}

        </section>
    );
}

export default Historico;
