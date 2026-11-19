
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const AlunoRouter = require('./router/AlunoRouter.js');
const CardRouter = require('./router/CardRouter.js');
const CategoriaRouter = require('./router/CategoriaRouter.js');
const SessoesEstudoRouter = require('./router/SessoesEstudoRouter.js');

const app = express();
const portaServico = 3000;

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

// Middlewares
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.static(path.join(__dirname, 'view')));

// Rotas
const alunoRoteador = new AlunoRouter();
const cardRoteador = new CardRouter();
const categoriaRoteador = new CategoriaRouter();
const sessaoRoteador = new SessoesEstudoRouter();

app.use('/alunos', alunoRoteador.createRoutes());
app.use('/card', cardRoteador.createRoutes());
app.use('/categoria', categoriaRoteador.createRoutes());
app.use('/sessoes', sessaoRoteador.createRoutes());

app.listen(portaServico, function () {
    console.log(`API rodando no endereço: http://localhost:${portaServico}/`);
});