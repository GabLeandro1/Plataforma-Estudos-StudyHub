const Banco = require('./Banco');

class Categoria {
  constructor() {
    this._id_categoria = null;
    this._id_aluno = null;
    this._id_categoria_pai = null;
    this._nome = null;
  }

  get id_categoria() { return this._id_categoria; }
  set id_categoria(value) { this._id_categoria = value; return this; }

  get id_aluno() { return this._id_aluno; }
  set id_aluno(value) { this._id_aluno = value; return this; }

  get id_categoria_pai() { return this._id_categoria_pai; }
  set id_categoria_pai(value) { this._id_categoria_pai = value; return this; }

  get nome() { return this._nome; }
  set nome(value) { this._nome = value; return this; }

  async create() {
    const conexao = await Banco.getConexao();
    const SQL = `
      INSERT INTO categorias (
        id_aluno,
        id_categoria_pai,
        nome
      ) VALUES (?, ?, ?)
    `;

    try {
      const [result] = await conexao.execute(SQL, [
        this._id_aluno ?? null,
        this._id_categoria_pai ?? null,
        this._nome ?? null,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      return false;
    }
  }

  async readAll() {
    const conexao = await Banco.getConexao();
    const SQL = 'SELECT * FROM categorias';

    try {
      const [rows] = await conexao.execute(SQL);
      return rows;
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      return [];
    }
  }

  async readByID() {
    const conexao = await Banco.getConexao();
    const SQL = 'SELECT * FROM categorias WHERE id_categoria = ?';

    try {
      const [rows] = await conexao.execute(SQL, [this._id_categoria]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Erro ao buscar categoria por ID:', error);
      return null;
    }
  }

  async readByIdAluno() {
    const conexao = await Banco.getConexao();
    const SQL = 'SELECT * FROM categorias WHERE id_aluno = ?';

    try {
      const [rows] = await conexao.execute(SQL, [this._id_aluno]);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar atestados por id do(a) aluno:', error);
      return [];
    }
  }

  async readByIdCategoriaPai() {
    const conexao = await Banco.getConexao();
    const SQL = 'SELECT * FROM categorias WHERE id_categoria_pai = ?';

    try {
      const [rows] = await conexao.execute(SQL, [this._id_categoria_pai]);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar atestados por id da categoria pai:', error);
      return [];
    }
  }

  async update() {
    const conexao = await Banco.getConexao();
    const SQL = `
      UPDATE categorias SET
        id_aluno = ?,
        id_categoria_pai = ?,
        nome = ?
      WHERE id_categoria = ?
    `;

    try {
      const [result] = await conexao.execute(SQL, [
        this._id_aluno ?? null,
        this._id_categoria_pai ?? null,
        this._nome ?? null,
        this._id_categoria ?? null
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      return false;
    }
  }

  async delete() {
    const conexao = await Banco.getConexao();
    const SQL = 'DELETE FROM categorias WHERE id_categoria = ?';

    try {
      const [result] = await conexao.execute(SQL, [this._id_categoria]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      return false;
    }
  }
}

module.exports = Categoria;