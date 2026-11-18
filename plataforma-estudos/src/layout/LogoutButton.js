import { IoIosLogOut } from "react-icons/io";
import styles from './LogoutButton.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import ModalConfirmacao from "../components/ModalConfirmacao.js";

function LogoutButton({ setLogado }) {
    const navigate = useNavigate();
    const [mostrarModal, setMostrarModal] = useState(false);
    function voltarTelaLogin() {
        navigate("/");
        setLogado(false);
        localStorage.removeItem('dados');
        localStorage.removeItem('token');
    }

    return (
        <>
            <div className={styles.containerSair} onClick={() => setMostrarModal(true)}>
                <button
                    className={styles.LogoutButton}
                >
                    <IoIosLogOut />
                </button>
                <p>Sair</p>
            </div>
            
            {mostrarModal && (
                <ModalConfirmacao
                    mensagem="Tem certeza de que deseja sair da plataforma?"
                    aoCancelar={() => setMostrarModal(false)}
                    aoConfirmar={voltarTelaLogin}
                />
            )}
        </>
    );
}

export default LogoutButton;