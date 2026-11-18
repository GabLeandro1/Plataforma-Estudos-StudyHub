import styles from './Pomodoro.module.css';
import { useState, useRef } from 'react';
import ButtonGoBack from '../layout/ButtonGoBack'

function Pomodoro() {
    // Configurações do Pomodoro
    const [tempoTotal, setTempoTotal] = useState('02:00:00');
    const [intervaloDescanso, setIntervaloDescanso] = useState('00:25:00');
    const [duracaoDescanso, setDuracaoDescanso] = useState('00:05:00');

    // Estados do cronômetro
    const [fase, setFase] = useState('Preparado');
    const [tempoRestante, setTempoRestante] = useState(0);
    const [estudoRestante, setEstudoRestante] = useState(0);
    const [ativo, setAtivo] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const intervalo = useRef(null);

    // Guarda os valores atuais do cronômetro
    const tempoAtual = useRef({
        fase: 'Preparado',
        tempoRestante: 0,
        estudoRestante: 0
    });

    return (
        <section className={styles.campo_hora}>
            <ButtonGoBack/>
            <h1>Configure seu Pomodoro</h1>

            <label htmlFor="tempoTotal">
                Tempo total de estudo
            </label>

            <input
                type="time"
                id="tempoTotal"
                step="1"
                value={tempoTotal}
             //   onChange={(e) => setTempoTotal(e.target.value)}
                disabled={ativo || tempoAtual.current.fase !== 'Preparado'}
            />

            <label htmlFor="intervaloDescanso">
                Intervalo entre os descansos
            </label>

            <input
                type="time"
                id="intervaloDescanso"
                step="1"
                value={intervaloDescanso}
         //       onChange={(e) => setIntervaloDescanso(e.target.value)}
                disabled={ativo || tempoAtual.current.fase !== 'Preparado'}
            />

            <label htmlFor="duracaoDescanso">
                Duração dos descansos
            </label>

            <input
                type="time"
                id="duracaoDescanso"
                step="1"
                value={duracaoDescanso}
     //           onChange={(e) => setDuracaoDescanso(e.target.value)}
                disabled={ativo || tempoAtual.current.fase !== 'Preparado'}
            />

            <h2>{fase}</h2>

            <h1 className={styles.visor}>
                {/* formatarTempo(tempoRestante) */}
            </h1>

            <p>
                Tempo de estudo restante: {/*formatarTempo(estudoRestante)*/}
            </p>

            <nav>
                <button disabled={ativo || finalizado}>
                    {fase === 'Preparado' ? 'Iniciar' : 'Continuar'}
                </button>

                <button disabled={!ativo}>
                    Pausar
                </button>

                <button >
                    Resetar
                </button>
            </nav>

        </section>
    );
}

export default Pomodoro;
