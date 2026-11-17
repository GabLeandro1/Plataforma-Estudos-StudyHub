import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Home';
import Cadastro from './pages/Cadastro';
import RecuperarSenha from './pages/RecuperarSenha';
import MenuAluno from './pages/MenuAluno';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/recuperar-senha" element={<RecuperarSenha />} />

        <Route path="/menu/aluno" element={<MenuAluno />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;