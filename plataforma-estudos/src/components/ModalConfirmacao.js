import styles from './ModalConfirmacao.module.css';

function ModalConfirmacao({ mensagem, aoConfirmar, aoCancelar }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Confirmar ação</h2>

                <p>{mensagem}</p>

                <div className={styles.botoes}>
                    <button
                        className={styles.cancelar}
                        onClick={aoCancelar}
                    >
                        Cancelar
                    </button>

                    <button
                        className={styles.confirmar}
                        onClick={aoConfirmar}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmacao;