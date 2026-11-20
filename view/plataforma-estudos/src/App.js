
import './App.css';

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useState } from 'react';

import Login from './pages/Home';
import Cadastro from './pages/Cadastro';
import RecuperarSenha from './pages/RecuperarSenha';

import MenuCronometroAluno from './pages/MenuCronometroAluno';
import Pomodoro from './pages/Pomodoro';
import CronometroProgressivo from './pages/CronometroProgressivo';
import CronometroRegressivo from './pages/CronometroRegressivo';

import Flashcards from './pages/Flashcards';
import Historico from './pages/Historico';

import Configuracoes from './pages/Configuracoes';

import NavBar from './components/NavBar';

function LayoutAluno({ setLogado }) {
    return (
        <>
            <NavBar setLogado={setLogado} />
            <Outlet />
        </>
    );
}

function App() {
    const [logado, setLogado] = useState(
        !!localStorage.getItem("token")
    );

    return (
        <BrowserRouter>
            <div className={logado ? "App logado" : "App"}>

                <Routes>

                    {/* Rotas públicas */}
                    <Route
                        path="/"
                        element={<Login setLogado={setLogado} />}
                    />

                    <Route
                        path="/cadastro"
                        element={<Cadastro />}
                    />

                    <Route
                        path="/recuperar-senha"
                        element={<RecuperarSenha />}
                    />

                    {/* Rotas do aluno */}
                    <Route
                        path="/menu/aluno"
                        element={<LayoutAluno setLogado={setLogado} />}
                    >

                        <Route
                            index
                            element={<MenuCronometroAluno />}
                        />

                        <Route
                            path="cronometro"
                            element={<MenuCronometroAluno />}
                        />

                        <Route
                            path="cronometro/pomodoro"
                            element={<Pomodoro />}
                        />

                        <Route
                            path="cronometro/cronometro-regressivo"
                            element={<CronometroRegressivo />}
                        />

                        <Route
                            path="cronometro/cronometro-progressivo"
                            element={<CronometroProgressivo />}
                        />

                        <Route
                            path="flashcards"
                            element={<Flashcards />}
                        />

                        <Route
                            path="historico"
                            element={<Historico />}
                        />

                        <Route
                            path="configuracoes/*"
                            element={<Configuracoes />}
                        />

                    </Route>

                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;