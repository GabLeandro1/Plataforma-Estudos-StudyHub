const Banco = require('./Banco');

class Card {
  constructor() {
    this._id_card = null;
    this._id_aluno = null;
    this._id_categoria = null;
    this._pergunta = null;
    this._resposta = null;
    this._data_criacao = null;
  }

  get id_card() { return this._id_card; }
  set id_card(value) { this._id_card = value; return this; }

  get id_aluno() { return this._id_aluno; }
  set id_aluno(value) { this._id_aluno = value; return this; }

  get id_categoria() { return this._id_categoria; }
  set id_categoria(value) { this._id_categoria = value; return this; }

  get pergunta() { return this._pergunta; }
  set pergunta(value) { this._pergunta = value; return this; }

  get resposta() { return this._resposta; }
  set resposta(value) { this._resposta = value; return this; }

  get data_criacao() { return this._data_criacao; }
  set data_criacao(value) { this._data_criacao = value; return this; }


  async create() {
    const conexao = await Banco.getConexao();
    const SQL = `
      INSERT INTO cards (
        id_aluno,
        id_categoria,
        pergunta,
        resposta,
        data_criacao
      ) VALUES (?, ?, ?, ?)
    `;

    try {
      const [result] = await conexao.execute(SQL, [
        this._id_aluno ?? null,
        this._id_categoria ?? null,
        this._pergunta ?? null,
        this._resposta ?? null,
        this._data_criacao ?? null,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao criar card:', error);
      return false;
    }
  }

  async readAll() {
    const conexao = await Banco.getConexao();
    const SQL = 'SELECT * FROM cards';

    try {
      const [rows] = await conexao.execute(SQL);
      return rows;
    } catch (error) {
      console.error('Erro ao listar cards:', error);
      return [];
    }
  }

  async readByID() {
    const conexao = await Banco.getConexao();
    const SQL = 'SELECT * FROM cards WHERE id_card = ?';

    try {
      const [rows] = await conexao.execute(SQL, [this._id_card]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Erro ao buscar card por ID:', error);
      return null;
    }
  }

  async readByIdAluno() {
    const conexao = await Banco.getConexao();
    const SQL = 'SELECT * FROM cards WHERE id_aluno = ?';

    try {
      const [rows] = await conexao.execute(SQL, [this._id_aluno]);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar cards por id do(a) aluno:', error);
      return [];
    }
  }

  async readByIdCategoria() {
    const conexao = await Banco.getConexao();
    const SQL = 'SELECT * FROM card WHERE id_categoria = ?';

    try {
      const [rows] = await conexao.execute(SQL, [this._id_categoria]);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar cards por id da categoria:', error);
      return [];
    }
  }

  async update() {
    const conexao = await Banco.getConexao();
    const SQL = `
      UPDATE cards SET
        id_aluno = ?,
        id_categoria = ?,
        pergunta = ?,
        resposta = ?
      WHERE id_card = ?
    `;

    try {
      const [result] = await conexao.execute(SQL, [
        this._id_aluno ?? null,
        this._id_categoria ?? null,
        this._pergunta ?? null,
        this._resposta ?? null,
        this._id_card ?? null
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao atualizar card:', error);
      return false;
    }
  }

  async delete() {
    const conexao = await Banco.getConexao();
    const SQL = 'DELETE FROM cards WHERE id_card = ?';

    try {
      const [result] = await conexao.execute(SQL, [this._id_card]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Erro ao deletar card:', error);
      return false;
    }
  }
}

module.exports = Card;