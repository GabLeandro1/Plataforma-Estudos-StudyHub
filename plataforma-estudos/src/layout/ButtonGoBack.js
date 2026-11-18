import styles from './ButtonGoBack.module.css';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ButtonGoBack() {
    const navigate = useNavigate();

    function voltarTela() {
        navigate(-1);
    }

    return (
        <div className={styles.containerVoltar}>
            <button
                className={styles.buttonGoBack}
                onClick={voltarTela}
            >
                <IoIosArrowBack />
            </button>

            <p>Voltar</p>
        </div>
    );
}

export default ButtonGoBack;