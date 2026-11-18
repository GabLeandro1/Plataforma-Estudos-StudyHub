import styles from '../components/NavBar.module.css'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import Container from '../layout/Container'
import { Link } from 'react-router-dom'
import logo from "../img/logo.png"
import ButtonLogout from "../layout/LogoutButton"

function NavBar({ setLogado }) {
 return (
       <nav class={styles.navbar}>
            <Container customClass="min-height">
                <Link to="/menu/aluno/">
                    <img class={styles.img} src={logo} alt="logo"/>
                </Link>
                <ul class={styles.list}>
                    <li class={styles.item}>
                        <Link to="/menu/aluno/cronometro">Cronômetro de estudo</Link>
                    </li>
                    <li class={styles.item}>
                        <Link to="/menu/aluno/flashcards">Flashcards</Link>
                    </li>
                    <li class={styles.item}>
                        <Link to="/menu/aluno/historico">Histórico de estudo</Link>
                    </li>
                    <li class={styles.item}>
                        <Link to="/menu/aluno/configuracoes">Configurações</Link>
                    </li>
                </ul>
                <ButtonLogout setLogado={setLogado}/>
            </Container>
       </nav>
    );
}

export default NavBar;