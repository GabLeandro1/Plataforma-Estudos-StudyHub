const express = require('express');
const path = require('path');
const AlunoRouter = require('./router/AlunoRouter.js');
const CardRouter = require('./router/CardRouter.js');
const CategoriaRouter = require('./router/CategoriaRouter.js');;

const app = express();

const portaServico = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware CORS simples (permite requisições do frontend na porta 3001)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Permite seu frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Se for usar cookies, habilite

  if (req.method === 'OPTIONS') {
    // Responde imediatamente às preflight requests
    return res.sendStatus(204);
  }

  next();
});

app.use(express.static(path.join(__dirname, 'view')));

const alunoRoteador = new AlunoRouter();
const cardRoteador = new CardRouter();
const categoriaRoteador = new CategoriaRouter();

app.use('/alunos', alunoRoteador.createRoutes());
app.use('/card', cardRoteador.createRoutes());
app.use('/categoria', categoriaRoteador.createRoutes());

app.listen(portaServico, function () {
  console.log(`API rodando no endereço: http://localhost:${portaServico}/`);
});