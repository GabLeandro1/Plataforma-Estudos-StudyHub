const express = require('express');
const SessoesEstudoControl = require('../control/SessoesEstudoControl');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class SessoesEstudoRouter {
    constructor() {
        this._router = express.Router();
        this._jwt = new JWTMiddleware();
        this._ctrl = new SessoesEstudoControl();
    }

    createRoutes() {
        this._router.post('/', this._jwt.validate, (req, res) =>
            this._ctrl.create(req, res)
        );

        this._router.get('/', this._jwt.validate, (req, res) =>
            this._ctrl.readAll(req, res)
        );

        this._router.get('/sessao/:id_sessao', this._jwt.validate, (req, res) =>
            this._ctrl.readById(req, res)
        );

        this._router.get('/aluno/:id_aluno', this._jwt.validate, (req, res) =>
            this._ctrl.readByIdAluno(req, res)
        );

        this._router.put('/:id_sessao', this._jwt.validate, (req, res) =>
            this._ctrl.update(req, res)
        );

        this._router.delete('/:id_sessao', this._jwt.validate, (req, res) =>
            this._ctrl.delete(req, res)
        );

        return this._router;
    }

    get router() {
        return this._router;
    }
};