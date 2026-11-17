const Categorias = require('../model/Categorias');
const JWTMiddleware = require('../middleware/JWTMiddleware');  // Importando o middleware de validação de token

module.exports = class CategoriasControl {
  
  async readAll(req, res) {
    try {
      // Verifica se o usuário está autenticado
      const jwtMiddleware = new JWTMiddleware();
      await jwtMiddleware.validate(req, res, () => {});  // Validando o token diretamente

      const categoria = new Categorias();
      const categorias = await categoria.readAll();

      return res.status(200).json({ cod: 1, status: true, categorias });
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      return res.status(500).json({ cod: 99, status: false, msg: "Erro ao listar categorias" });
    }
  }

  async readByIdCategoria(req, res) {
    try {
      const jwtMiddleware = new JWTMiddleware();
      await jwtMiddleware.validate(req, res, () => {});  // Validando o token diretamente

      const categoria = new Categorias();
      categoria.id_categoria = req.params.id_categoria;

      const dados = await categoria.readByIdCategoria();
      return res.status(200).json({ cod: 1, status: true, categoria: dados });
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      return res.status(500).json({ cod: 99, status: false, msg: "Erro ao buscar categoria" });
    }
  }

  async readByIdCategoriaPai(req, res) {
    try {
      const jwtMiddleware = new JWTMiddleware();
      await jwtMiddleware.validate(req, res, () => {});  // Validando o token diretamente

      const categoria = new Categorias();
      categoria.id_categoria_pai = req.params.id_categoria_pai;

      const dados = await categoria.readByIdCategoriaPai();
      return res.status(200).json({ cod: 1, status: true, categoria: dados });
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      return res.status(500).json({ cod: 99, status: false, msg: "Erro ao buscar categoria" });
    }
  }

  async readByIdAluno(req, res) {
    try {
      // Verifica se o usuário está autenticado
      const jwtMiddleware = new JWTMiddleware();
      await jwtMiddleware.validate(req, res, () => {});  // Validando o token diretamente

      const categoria = new Categorias();
      categoria.id_aluno = req.params.id_aluno;

      const dados = await categoria.readByID();
      return res.status(200).json({ cod: 1, status: true, categoria: dados });
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      return res.status(500).json({ cod: 99, status: false, msg: "Erro ao buscar categoria" });
    }
  }

  async create(req, res) {
    try {
      // Verifica se o usuário está autenticado
      const jwtMiddleware = new JWTMiddleware();
      await jwtMiddleware.validate(req, res, () => {});  // Validando o token diretamente

      const { nome, id_categoria, id_aluno, id_categoria_pai } = req.body.categoria || req.body;

      const categoria = new Categorias();
      categoria.nome = nome;
      categoria.id_categoria = id_categoria;
      categoria.id_aluno = id_aluno;
      categoria.id_categoria_pai = id_categoria_pai;       

      const criado = await categoria.create();
      return res.status(201).json({
        cod: criado ? 1 : 0,
        status: criado,
        msg: criado ? "Categoria criado com sucesso" : "Erro ao criar categoria"
      });
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      return res.status(500).json({ cod: 99, status: false, msg: "Erro interno ao criar categoria" });
    }
  }

  // Método para atualizar categoria
  async update(req, res) {
    try {
      // Verifica se o usuário está autenticado
      const jwtMiddleware = new JWTMiddleware();
      await jwtMiddleware.validate(req, res, () => {});  // Validando o token diretamente

      const { nome, id_categoria, id_aluno, id_categoria_pai } = req.body.categoria || req.body;

      const categoria = new Categorias();
      categoria.nome = nome;
      categoria.id_categoria = id_categoria;
      categoria.id_aluno = id_aluno;
      categoria.id_categoria_pai = id_categoria_pai;

      const atualizado = await categoria.update();
      return res.status(200).json({
        cod: atualizado ? 1 : 0,
        status: atualizado,
        msg: atualizado ? "Categoria atualizado com sucesso" : "Erro ao atualizar categoria"
      });
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      return res.status(500).json({ cod: 99, status: false, msg: "Erro interno ao atualizar categoria" });
    }
  }

  async delete(req, res) {
    try {
      // Verifica se o usuário está autenticado
      const jwtMiddleware = new JWTMiddleware();
      await jwtMiddleware.validate(req, res, () => {});  // Validando o token diretamente

      const categoria = new Categorias();
      categoria.id_categoria = req.params.id_categoria;

      const excluido = await categoria.delete();
      return res.status(200).json({
        cod: excluido ? 1 : 0,
        status: excluido,
        msg: excluido ? "Categoria excluída com sucesso" : "Erro ao excluir categoria"
      });
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      return res.status(500).json({ cod: 99, status: false, msg: "Erro interno ao excluir categoria" });
    }
  }
};
