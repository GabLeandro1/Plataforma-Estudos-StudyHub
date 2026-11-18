import FormularioRecuperarSenha from '../components/FormRecuperarSenha'
import styles from './Home.module.css'; 
import logo from "../img/logo.png"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function RecuperarSenha() {
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
                <p>Digite seu e-mail para enviarmos o código.</p>
            </header>
            <FormularioRecuperarSenha/>
        </main>
    )
}

export default RecuperarSenha;