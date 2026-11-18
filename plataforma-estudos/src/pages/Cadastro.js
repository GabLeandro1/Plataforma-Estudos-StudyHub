import FormularioCadastro from '../components/FormCadastro'
import styles from './Home.module.css';
import logo from "../img/logo.png"
import ButtonGoBack from '../layout/ButtonGoBack'

function CadastrarUsuario() {
    return (
        <main className={styles.home}>
            <ButtonGoBack/>
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