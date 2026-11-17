import styles from '../components/NavBar.module.css'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import Container from '../layout/Container'
import Cadastro from '../pages/Cadastro'
import { Link } from 'react-router-dom'
import logo from "../img/logo.png"

function NavBar() {
 return (
       <nav class={styles.navbar}>
            <Container customClass="min-height">
                <Link to="/">
                    <img class={styles.img} src={logo} alt="logo"/>
                </Link>
                <ul class={styles.list}>
                    <li class={styles.item}>
                        <Link to="/menu/aluno">Cronômetro de estudo</Link>
                    </li>
                    <li class={styles.item}>
                        <Link to="/flashcards">Flashcards</Link>
                    </li>
                    <li class={styles.item}>
                        <Link to="/historico">Histórico de estudo</Link>
                    </li>
                    <li class={styles.item}>
                        <Link to="/configuracoes">Configurações</Link>
                    </li>
                </ul>
            </Container>
       </nav>
    );
}

export default NavBar;