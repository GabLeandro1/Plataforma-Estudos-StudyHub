const express = require('express');
const CategoriaControl = require('../control/CategoriaControl');
const CategoriaMiddleware = require('../middleware/CategoriaMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class CategoriaRouter {
  constructor() {
    this._router = express.Router();
    this._jwt = new JWTMiddleware();
    this._ctrl = new CategoriaControl();
    this._middleware = new CategoriaMiddleware();
  }

  createRoutes() {
    this._router.get('/', this._jwt.validate, (req, res) =>
      this._ctrl.readAll(req, res)
    );

    this._router.get('/:id_categoria', this._jwt.validate, (req, res) =>
      this._ctrl.readByIdCategoria(req, res)
    );

    this._router.get('/:id_categoria_pai', this._jwt.validate, (req, res) =>
      this._ctrl.readByIdCategoriaPai(req, res)
    );
    
    this._router.get('/:id_aluno', this._jwt.validate, (req, res) =>
      this._ctrl.readByIdAluno(req, res)
    );

    this._router.post('/',
      this._jwt.validate,
      this._middleware.validarCamposObrigatorios.bind(this._middleware),
      (req, res) => this._ctrl.create(req, res)
    );

    this._router.put('/:id_categoria',
      this._jwt.validate,
      this._middleware.validarCamposObrigatorios.bind(this._middleware),
      (req, res) => this._ctrl.update(req, res)
    );

    this._router.delete('/:id_categoria',
      this._jwt.validate,
      (req, res) => this._ctrl.delete(req, res)
    );

    return this._router;
  }

  get router() {
    return this._router;
  }
};
