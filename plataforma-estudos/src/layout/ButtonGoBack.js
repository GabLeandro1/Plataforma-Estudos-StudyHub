
import styles from './ButtonGoBack.module.css';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ButtonGoBack({ onClick, className }) {
    const navigate = useNavigate();

    function voltarTela() {
        if (onClick) {
            onClick();
        } else {
            navigate(-1);
        }
    }

    return (
        <div className={`${styles.containerVoltar} ${className || ''}`}>
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