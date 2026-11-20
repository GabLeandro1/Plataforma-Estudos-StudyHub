const express = require('express');
const CardControl = require('../control/CardControl');
const CardMiddleware = require('../middleware/CardMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class CardRouter {
    constructor() {
        this.router = express.Router();
        this.jwtMiddleware = new JWTMiddleware();
        this.cardControl = new CardControl();
        this.cardMiddleware = new CardMiddleware();
    }

    createRoutes() {
        this.router.get(
            '/id_card/:id_card',
            this.jwtMiddleware.validate,
            this.cardControl.readByIdCard.bind(this.cardControl)
        );

        this.router.get(
            '/id_aluno/:id_aluno',
            this.jwtMiddleware.validate,
            this.cardControl.readByIdAluno.bind(this.cardControl)
        );

        this.router.get(
            '/id_categoria/:id_categoria',
            this.jwtMiddleware.validate,
            this.cardControl.readByIdCategoria.bind(this.cardControl)
        );

        this.router.get(
            '/',
            this.jwtMiddleware.validate,
            this.cardControl.readAll.bind(this.cardControl)
        );

        this.router.post(
            '/',
            this.jwtMiddleware.validate,
            this.cardMiddleware.validarCamposObrigatorios.bind(this.cardMiddleware),
            this.cardControl.create.bind(this.cardControl)
        );

        this.router.put(
            '/:id_card',
            this.jwtMiddleware.validate,
            this.cardMiddleware.validarCamposObrigatorios.bind(this.cardMiddleware),
            this.cardControl.update.bind(this.cardControl)
        );

        this.router.delete(
            '/:id_card',
            this.jwtMiddleware.validate,
            this.cardControl.delete.bind(this.cardControl)
        );

        this.router.get(
            '/id_aluno/:id_aluno/id_categoria/:id_categoria',
            this.jwtMiddleware.validate,
            this.cardControl.readByIdAlunoCategoria.bind(this.cardControl)
        );
        
        return this.router;
    }
};