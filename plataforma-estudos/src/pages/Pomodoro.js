
import styles from './Pomodoro.module.css';
import { useState, useRef, useEffect } from 'react';
import ButtonGoBack from '../layout/ButtonGoBack';
import { requisicaoComToken } from '../services/api';

function Pomodoro() {
    // Configurações do Pomodoro
    const [tempoTotal, setTempoTotal] = useState('00:00:00');
    const [intervaloDescanso, setIntervaloDescanso] = useState('00:00:00');
    const [duracaoDescanso, setDuracaoDescanso] = useState('00:00:00');

    const [tempoRestante, setTempoRestante] = useState(0);
    const [estudoRestante, setEstudoRestante] = useState(0);

    const [fase, setFase] = useState('Preparado');
    const [ativo, setAtivo] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    const intervalo = useRef(null);
    const tempoInicial = useRef(0);

    // Guarda os valores atuais do cronômetro
    const tempoAtual = useRef({
        fase: 'Preparado',
        tempoRestante: 0,
        estudoRestante: 0
    });

    // Converte HH:MM:SS em segundos
    function converterParaSegundos(valor) {
        const partes = valor.split(':').map(Number);

        const horas = partes[0] || 0;
        const minutos = partes[1] || 0;
        const segundos = partes[2] || 0;

        return (horas * 3600) + (minutos * 60) + segundos;
    }

    // Converte segundos em HH:MM:SS
    function formatarTempo(valor) {
        const horas = Math.floor(valor / 3600);
        const minutos = Math.floor((valor % 3600) / 60);
        const segundos = valor % 60;

        return [horas, minutos, segundos]
            .map(valor => String(valor).padStart(2, '0'))
            .join(':');
    }

    // Atualiza o cronômetro
    function atualizarCronometro() {
        const atual = tempoAtual.current;

        if (atual.fase === 'Estudo') {
            const novoEstudo = atual.estudoRestante - 1;
            const novoTempo = atual.tempoRestante - 1;

            // Todo o tempo de estudo foi concluído
            if (novoEstudo <= 0) {
                pausar();

                tempoAtual.current = {
                    fase: 'Finalizado',
                    tempoRestante: 0,
                    estudoRestante: 0
                };

                setFase('Finalizado');
                setTempoRestante(0);
                setEstudoRestante(0);
                setFinalizado(true);

                return;
            }

            // Chegou a hora do descanso
            if (novoTempo <= 0 && converterParaSegundos(intervaloDescanso) > 0) {
                const descanso = converterParaSegundos(duracaoDescanso);

                if (descanso > 0) {
                    tempoAtual.current = {
                        fase: 'Descanso',
                        tempoRestante: descanso,
                        estudoRestante: novoEstudo
                    };

                    setFase('Descanso');
                    setTempoRestante(descanso);
                    setEstudoRestante(novoEstudo);

                    return;
                }
            }

            // Continua estudando
            const proximoTempo = novoTempo <= 0
                ? Math.min(converterParaSegundos(intervaloDescanso), novoEstudo)
                : novoTempo;

            tempoAtual.current = {
                fase: 'Estudo',
                tempoRestante: proximoTempo,
                estudoRestante: novoEstudo
            };

            setTempoRestante(proximoTempo);
            setEstudoRestante(novoEstudo);

        } else if (atual.fase === 'Descanso') {
            const novoTempo = atual.tempoRestante - 1;

            // Descanso concluído
            if (novoTempo <= 0) {
                const intervaloEstudo = converterParaSegundos(intervaloDescanso);

                const proximoTempo = intervaloEstudo > 0
                    ? Math.min(intervaloEstudo, atual.estudoRestante)
                    : atual.estudoRestante;

                tempoAtual.current = {
                    fase: 'Estudo',
                    tempoRestante: proximoTempo,
                    estudoRestante: atual.estudoRestante
                };

                setFase('Estudo');
                setTempoRestante(proximoTempo);

            } else {
                tempoAtual.current = {
                    ...atual,
                    tempoRestante: novoTempo
                };

                setTempoRestante(novoTempo);
            }
        }
    }

    // Iniciar ou continuar
    function iniciar() {
        if (intervalo.current !== null || finalizado) return;

        // Primeira inicialização
        if (tempoAtual.current.fase === 'Preparado') {
            const total = converterParaSegundos(tempoTotal);
            const descanso = converterParaSegundos(duracaoDescanso);
            const intervaloEstudo = converterParaSegundos(intervaloDescanso);

            if (total <= 0) {
                setErro("Informe um tempo total de estudo válido.");
                return;
            }

            if (intervaloEstudo > 0 && descanso <= 0) {
                setErro("Informe uma duração de descanso válida.");
                return;
            }

            tempoInicial.current = total;

            const primeiroIntervalo = intervaloEstudo > 0
                ? Math.min(intervaloEstudo, total)
                : total;

            tempoAtual.current = {
                fase: 'Estudo',
                tempoRestante: primeiroIntervalo,
                estudoRestante: total
            };

            setFase('Estudo');
            setTempoRestante(primeiroIntervalo);
            setEstudoRestante(total);
            setErro("");
        }

        setAtivo(true);
        intervalo.current = setInterval(atualizarCronometro, 1000);
    }

    // Pausar cronômetro
    function pausar() {
        clearInterval(intervalo.current);
        intervalo.current = null;
        setAtivo(false);
    }

    // Resetar cronômetro
    function resetar() {
        pausar();

        tempoAtual.current = {
            fase: 'Preparado',
            tempoRestante: 0,
            estudoRestante: 0
        };

        tempoInicial.current = 0;

        setFase('Preparado');
        setTempoRestante(0);
        setEstudoRestante(0);
        setFinalizado(false);
        setErro("");
    }

    // Salvar sessão de estudo
    async function parar() {
        pausar();

        const tempoEstudado =
            tempoInicial.current - tempoAtual.current.estudoRestante;

        if (tempoEstudado <= 0) {
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

            const resposta = await requisicaoComToken("/sessoes/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    id_aluno: aluno.id_aluno,
                    tempo_estudado: tempoEstudado
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

    // Limpa o intervalo ao desmontar o componente
    useEffect(() => {
        return () => clearInterval(intervalo.current);
    }, []);

    return (
        <section className={styles.campo_hora}>
            <ButtonGoBack />

            <h1>Configure seu Pomodoro</h1>

            <label htmlFor="tempoTotal">
                Tempo total de estudo
            </label>

            <input
                type="time"
                id="tempoTotal"
                step="1"
                value={tempoTotal}
                onChange={(e) => setTempoTotal(e.target.value)}
                disabled={fase !== 'Preparado'}
            />

            <label htmlFor="intervaloDescanso">
                Intervalo entre os descansos
            </label>

            <input
                type="time"
                id="intervaloDescanso"
                step="1"
                value={intervaloDescanso}
                onChange={(e) => setIntervaloDescanso(e.target.value)}
                disabled={fase !== 'Preparado'}
            />

            <label htmlFor="duracaoDescanso">
                Duração dos descansos
            </label>

            <input
                type="time"
                id="duracaoDescanso"
                step="1"
                value={duracaoDescanso}
                onChange={(e) => setDuracaoDescanso(e.target.value)}
                disabled={fase !== 'Preparado'}
            />

            <h2>{fase}</h2>

            <h1 className={styles.visor}>
                {formatarTempo(tempoRestante)}
            </h1>

            <p>
                Tempo de estudo restante: {formatarTempo(estudoRestante)}
            </p>

            {erro && <p className={styles.erro}>{erro}</p>}

            <nav>
                <button
                    onClick={iniciar}
                    disabled={ativo || finalizado}
                >
                    {fase === 'Preparado' ? 'Iniciar' : 'Continuar'}
                </button>

                <button
                    onClick={pausar}
                    disabled={!ativo}
                >
                    Pausar
                </button>

                <button
                    onClick={resetar}
                    disabled={salvando}
                >
                    Resetar
                </button>

                <button
                    onClick={parar}
                    disabled={salvando || tempoInicial.current === 0}
                >
                    {salvando ? "Salvando..." : "Parar"}
                </button>
            </nav>
        </section>
    );
}

export default Pomodoro;