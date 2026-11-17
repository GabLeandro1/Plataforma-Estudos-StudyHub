import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Form from './form/Formu';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>StudyHub</h1>
        <h1>Olá! Seja bem-vindo à plataforma de estudos!</h1>
        <Form />
      </div>
    </BrowserRouter>
  );
}

export default App;