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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/recuperar-senha" element={<RecuperarSenha />} />

        <Route
          path="/menu/aluno"
          element={
            <>
              <NavBar />
              <MenuCronometroAluno />
            </>
          }
        />

        <Route
          path="/menu/aluno/cronometro"
          element={
            <>
              <NavBar />
              <MenuCronometroAluno />
            </>
          }
        />

        <Route
          path="/menu/aluno/flashcards"
          element={
            <>
              <NavBar />
              <Flashcards />
            </>
          }
        />

        <Route
          path="/menu/aluno/historico"
          element={
            <>
              <NavBar />
              <MenuCronometroAluno />
            </>
          }
        />

        <Route
          path="/menu/aluno/configuracoes"
          element={
            <>
              <NavBar />
              <MenuCronometroAluno />
            </>
          }
        />

        <Route
          path="/menu/aluno/cronometro/pomodoro"
          element={
            <>
              <NavBar />
              <Pomodoro />
            </>
          }
        />

        <Route
          path="/menu/aluno/cronometro/cronometro-regressivo"
          element={
            <>
              <NavBar />
              <CronometroRegressivo />
            </>
          }
        />

        <Route
          path="/menu/aluno/cronometro/cronometro-progressivo"
          element={
            <>
              <NavBar />
              <CronometroProgressivo />
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;