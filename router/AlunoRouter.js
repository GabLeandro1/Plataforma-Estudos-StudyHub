
const express = require('express');
const AlunoControl = require('../control/AlunoControl');
const JWTMiddleware = require('../middleware/JWTMiddleware');
const uploadImagem = require('../middleware/uploadImagem');

module.exports = class AlunoRouter {
    constructor() {
        this._router = express.Router();
        this._jwt = new JWTMiddleware();
        this._ctrl = new AlunoControl();
    }

    createRoutes() {
        this._router.post('/login', (req, res) =>
            this._ctrl.login(req, res)
        );

        this._router.post('/refresh', (req, res) =>
            this._ctrl.refresh(req, res)
        );

        this._router.post('/recuperar-senha', (req, res) =>
            this._ctrl.recuperar_senha(req, res)
        );

        this._router.post('/', (req, res) =>
            this._ctrl.create(req, res)
        );

        this._router.get('/', this._jwt.validate, (req, res) =>
            this._ctrl.readAll(req, res)
        );

        this._router.get('/:id_aluno', this._jwt.validate, (req, res) =>
            this._ctrl.readById(req, res)
        );

        this._router.put('/:id_aluno', this._jwt.validate, (req, res) =>
            this._ctrl.update(req, res)
        );

        this._router.put('/:id_aluno/imagem', this._jwt.validate, uploadImagem.single('imagem'), (req, res) =>
            this._ctrl.atualizarImagem(req, res)
        ); 

        this._router.delete('/:id_aluno', this._jwt.validate, (req, res) =>
            this._ctrl.delete(req, res)
        );

        return this._router;
    }

    get router() {
        return this._router;
    }
};