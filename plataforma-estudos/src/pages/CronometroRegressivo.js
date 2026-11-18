
import styles from './CronometroRegressivo.module.css';
import { useState, useRef } from 'react';

function CronometroRegressivo() {
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [horas, setHoras] = useState(0);

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
        if (intervalo.current !== null) return;

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

        setHoras(novoTempo.horas);
        setMinutos(novoTempo.minutos);
        setSegundos(novoTempo.segundos);
    }

    const visor = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}`;

    return (
        <section className={styles.campo_hora}>
            <h1>Digite o valor inicial de hora</h1>

            <input
                type="time"
                name="horaInicio"
                step="1"
                onChange={definirTempo}
            />

            <h1 className={styles.visor}>{visor}</h1>

            <nav>
                <button onClick={iniciar}>Iniciar</button>
                <button onClick={pausar}>Pausar</button>
                <button onClick={resetar}>Resetar</button>
            </nav>
        </section>
    );
}

export default CronometroRegressivo;
