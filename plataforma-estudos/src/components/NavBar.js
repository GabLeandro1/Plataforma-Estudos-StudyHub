
import styles from '../components/NavBar.module.css';
import { useState, useEffect } from 'react';
import Container from '../layout/Container';
import { Link } from 'react-router-dom';
import logo from "../img/logo.png";
import ButtonLogout from "../layout/LogoutButton";
import ImagemPerfil from "../layout/ImagemPerfil";

function NavBar({ setLogado }) {
    const [imagemPerfil, setImagemPerfil] = useState(null);

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem('dados'));
        setImagemPerfil(dados?.imagem_perfil || null);
    }, []);

    const dados =  JSON.parse(localStorage.getItem("dados"));
    const nomeUsuario = dados?.nome || "estudante";

    return (
        <nav className={styles.navbar}>
            <Container customClass="min-height">
                <Link to="/menu/aluno/">
                    <img className={styles.img} src={logo} alt="logo" />
                </Link>

                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/menu/aluno/cronometro">
                            Cronômetro de estudo
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link to="/menu/aluno/flashcards">
                            Flashcards
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link to="/menu/aluno/historico">
                            Histórico de estudo
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link to="/menu/aluno/configuracoes">
                            Configurações
                        </Link>
                    </li>
                </ul>

                <ButtonLogout setLogado={setLogado} />

                <div className={styles.perfil}>
                    <ImagemPerfil
                        imagemPerfil={imagemPerfil}
                        className={styles.imagemPerfil}
                    />

                    <div className={styles.infoUsuario}>
                        <span className={styles.nomeUsuario}>
                            {nomeUsuario}
                        </span>
                    </div>
                </div>
            </Container>
        </nav>
    );
}

export default NavBar;