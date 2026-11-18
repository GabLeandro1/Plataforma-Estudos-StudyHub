import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Home';
import Cadastro from './pages/Cadastro';
import RecuperarSenha from './pages/RecuperarSenha';
import MenuCronometroAluno from './pages/MenuCronometroAluno';

import NavBar from './components/NavBar';

import Pomodoro from './pages/Pomodoro'
import CronometroProgressivo from './pages/CronometroProgressivo'
import CronometroRegressivo from './pages/CronometroRegressivo'
import Flashcards from './pages/Flashcards'
import { useState } from 'react'


function App() {
  const [logado, setLogado] = useState(localStorage.getItem("token") ? true : false);
  return (
    <BrowserRouter>
      <div className={logado ? "App logado" : "App"}>
        <Routes>
          <Route path="/" element={<Login setLogado={setLogado}/>} />

          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="/recuperar-senha" element={<RecuperarSenha />} />

          <Route
            path="/menu/aluno"
            element={
              <>
                <NavBar setLogado={setLogado}/>
                <MenuCronometroAluno />
              </>
            }
          />

          <Route
            path="/menu/aluno/cronometro"
            element={
              <>
                <NavBar setLogado={setLogado}/>
                <MenuCronometroAluno />
              </>
            }
          />

          <Route
            path="/menu/aluno/flashcards"
            element={
              <>
                <NavBar setLogado={setLogado}/>
                <Flashcards />
              </>
            }
          />

          <Route
            path="/menu/aluno/historico"
            element={
              <>
                <NavBar setLogado={setLogado}/>
                <MenuCronometroAluno />
              </>
            }
          />

          <Route
            path="/menu/aluno/configuracoes"
            element={
              <>
                <NavBar setLogado={setLogado}/>
                <MenuCronometroAluno />
              </>
            }
          />

          <Route
            path="/menu/aluno/cronometro/pomodoro"
            element={
              <>
                <NavBar setLogado={setLogado}/>
                <Pomodoro />
              </>
            }
          />

          <Route
            path="/menu/aluno/cronometro/cronometro-regressivo"
            element={
              <>
                <NavBar setLogado={setLogado}/>
                <CronometroRegressivo />
              </>
            }
          />

          <Route
            path="/menu/aluno/cronometro/cronometro-progressivo"
            element={
              <>
                <NavBar setLogado={setLogado}/>
                <CronometroProgressivo />
              </>
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;