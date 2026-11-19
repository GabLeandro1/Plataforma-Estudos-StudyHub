
import styles from './CronometroProgressivo.module.css';
import { useState, useRef, useEffect } from 'react';
import ButtonGoBack from '../layout/ButtonGoBack';

function CronometroProgressivo() {
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [horas, setHoras] = useState(0);
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);

    const intervalo = useRef(null);
    const inicioSessao = useRef(null);

    function formatarTempo(valor) {
        return valor < 10 ? `0${valor}` : valor;
    }

    function atualizarCronometro() {
        setSegundos((valor) => {
            if (valor === 59) {
                setMinutos((min) => {
                    if (min === 59) {
                        setHoras((hora) => hora + 1);
                        return 0;
                    }

                    return min + 1;
                });

                return 0;
            }

            return valor + 1;
        });
    }

    function iniciar() {
        if (intervalo.current !== null) return;

        if (inicioSessao.current === null) {
            inicioSessao.current = new Date();
        }

        setErro("");
        intervalo.current = setInterval(atualizarCronometro, 1000);
    }

    function pausar() {
        clearInterval(intervalo.current);
        intervalo.current = null;
    }

    function resetar() {
        pausar();

        setSegundos(0);
        setMinutos(0);
        setHoras(0);

        inicioSessao.current = null;
        setErro("");
    }

    async function parar() {
        pausar();

        const tempoTotal = (horas * 3600) + (minutos * 60) + segundos;

        if (tempoTotal === 0) {
            setErro("Você precisa estudar por pelo menos 1 segundo.");
            return;
        }

        if (salvando) return;

        try {
            setSalvando(true);
            setErro("");

            const aluno = JSON.parse(localStorage.getItem("dados"));

            if (!aluno || !aluno.id_aluno) {
                throw new Error("Aluno não encontrado.");
            }

            const resposta = await fetch("http://localhost:3000/sessoes/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_aluno: aluno.id_aluno,
                    tempo_estudado: tempoTotal
                })
            });

            if (!resposta.ok) {
                throw new Error("Falha ao salvar a sessão de estudo.");
            }

            const dados = await resposta.json();

            if (dados.msg === "Sessão criada com sucesso.") {
                resetar();
            } else {
                setErro("Ocorreu um problema ao salvar sua sessão.");
            }

        } catch (err) {
            setErro("Não foi possível salvar sua sessão de estudo.");
            console.error(err);

        } finally {
            setSalvando(false);
        }
    }

    useEffect(() => {
        return () => clearInterval(intervalo.current);
    }, []);

    const visor = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}`;

    return (
        <section className={styles.campo_hora}>
            <ButtonGoBack />

            <h1>Tempo decorrido</h1>

            <h1 className={styles.visor}>{visor}</h1>

            <nav>
                <button onClick={iniciar}>Iniciar</button>
                <button onClick={pausar}>Pausar</button>
                <button onClick={resetar}>Resetar</button>

                <button onClick={parar} disabled={salvando}>
                    {salvando ? "Salvando..." : "Parar"}
                </button>
            </nav>

            {erro && <p>{erro}</p>}
        </section>
    );
}

export default CronometroProgressivo;