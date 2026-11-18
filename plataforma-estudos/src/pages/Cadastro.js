import FormularioCadastro from '../components/FormCadastro'
import styles from './Home.module.css';
import logo from "../img/logo.png"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function CadastrarUsuario() {
    const navigate = useNavigate();
    function voltarTela(){
        navigate(-1);
    }
    return (
        <main className={styles.home}>
            <button className={styles.buttonGoBack} onClick={voltarTela}><IoIosArrowBack/></button>
            <header className={styles.cabecalho}>
                <div className={styles.titulo_imagem}>
                    <h1>StudyHub</h1>
                    <img className={styles.img} src={logo} alt="Logo do StudyHub" />
                </div>
                <p>Faça o seu cadastro!</p>
                <span>Seu espaço para aprender e evoluir.</span>
                <FormularioCadastro/>
            </header>
        </main>
    )
}

export default CadastrarUsuario;