
import styles from './CronometroProgressivo.module.css';
import { useState, useRef } from 'react';

function CronometroProgressivo() {
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [horas, setHoras] = useState(0);

    const intervalo = useRef(null);

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
    }

    const visor = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}`;

    return (
        <section className={styles.campo_hora}>
            <h1>Tempo decorrido</h1>
            <h1 className={styles.visor}>{visor}</h1>
            <nav>
                <button onClick={iniciar}>Iniciar</button>
                <button onClick={pausar}>Pausar</button>
                <button onClick={resetar}>Resetar</button>
            </nav>
        </section>
    );
}

export default CronometroProgressivo;
