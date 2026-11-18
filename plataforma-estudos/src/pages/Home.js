import Login from '../components/Login';
import styles from './Home.module.css';
import logo from "../img/logo.png"

function Home() {
    return (
        <main className={styles.home}>
            <header className={styles.cabecalho}>
                <div className={styles.titulo_imagem}>
                    <h1>StudyHub</h1>
                    <img className={styles.img} src={logo} alt="Logo do StudyHub" />
                </div>
                <p>Olá! Seja bem-vindo à plataforma de estudos!</p>
                <span>Seu espaço para aprender e evoluir.</span>
            </header>

            <Login />
        </main>
    );
}

export default Home;