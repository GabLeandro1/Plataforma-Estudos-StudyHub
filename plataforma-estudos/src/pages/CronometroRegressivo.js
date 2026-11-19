
import styles from './CronometroRegressivo.module.css';
import { useState, useRef } from 'react';
import ButtonGoBack from '../layout/ButtonGoBack'

function CronometroRegressivo() {
    const [segundos, setSegundos] = useState(0);
    const [txtBtn1, setTxtBtn1] = useState("Iniciar");
    const [minutos, setMinutos] = useState(0);
    const [horas, setHoras] = useState(0);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");
    const tempoInicial = useRef(0);
    const [horaInicial, setHoraInicial] = useState("00:00:00");
    const intervalo = useRef(null);

    const tempoAtual = useRef({
        horas: 0,
        minutos: 0,
        segundos: 0
    });

    function formatarTempo(valor) {
        return valor < 10 ? `0${valor}` : valor;
    }

    function atualizarCronometro() {
        let { horas, minutos, segundos } = tempoAtual.current;

        if (horas === 0 && minutos === 0 && segundos === 0) {
            pausar();
            return;
        }

        if (segundos > 0) {
            segundos--;
        } else if (minutos > 0) {
            minutos--;
            segundos = 59;
        } else if (horas > 0) {
            horas--;
            minutos = 59;
            segundos = 59;
        }

        tempoAtual.current = { horas, minutos, segundos };

        setHoras(horas);
        setMinutos(minutos);
        setSegundos(segundos);
    }

    function iniciar() {
        if (intervalo.current !== null)
            return;
        if (
            tempoAtual.current.horas === 0 &&
            tempoAtual.current.minutos === 0 &&
            tempoAtual.current.segundos === 0
        ) return;

        intervalo.current = setInterval(atualizarCronometro, 1000);
    }

    function pausar() {
        clearInterval(intervalo.current);
        intervalo.current = null;
    }

    function resetar() {
        pausar();

        tempoAtual.current = {
            horas: 0,
            minutos: 0,
            segundos: 0
        };

        setHoras(0);
        setMinutos(0);
        setSegundos(0);
    }

    function definirTempo(event) {
        const [hora, minuto, segundo] = event.target.value.split(':');

        pausar();

        const novoTempo = {
            horas: Number(hora),
            minutos: Number(minuto),
            segundos: Number(segundo)
        };

        tempoAtual.current = novoTempo;
 
        tempoInicial.current =
        (novoTempo.horas * 3600) +
        (novoTempo.minutos * 60) +
        novoTempo.segundos;

        setHoras(novoTempo.horas);
        setMinutos(novoTempo.minutos);
        setSegundos(novoTempo.segundos);
        setHoraInicial(event.target.value);
    }

    async function parar() {
        pausar();

        const tempoRestante = (tempoAtual.current.horas * 3600) + (tempoAtual.current.minutos * 60) + tempoAtual.current.segundos;

        const tempoTotal =  tempoInicial.current - tempoRestante;

        if (tempoTotal <= 0) {
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

    const visor = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}`;

    return (
        <section className={styles.campo_hora}>
            <ButtonGoBack/>
            <h1>Digite o valor inicial de hora</h1>
            <input
                type="time"
                name="horaInicio"
                step="1"
                value={horaInicial}
                onChange={definirTempo}
            />
            <h1>Tempo restante</h1>
            <h1 className={styles.visor}>{visor}</h1>
            <nav>
                <button onClick={() => {
                    iniciar();
                    setTxtBtn1("Continuar");
                }}>
                    {txtBtn1}
                </button>
                <button onClick={pausar}>Pausar</button>
                <button onClick={resetar}>Resetar</button>
                <button onClick={parar} disabled={salvando}>
                    {salvando ? "Salvando..." : "Parar"}
                </button>
            </nav>
        </section>
    );
}

export default CronometroRegressivo;
