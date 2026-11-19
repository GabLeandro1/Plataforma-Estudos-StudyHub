const Banco = require('./Banco');

class SessoesEstudo {
  constructor() {
    this._id_sessoes = null;
    this._tempo_estudado = null;
    this._data = null;
    this._id_aluno = null;
  }

  get id_sessoes() { return this._id_sessoes; }
  set id_sessoes(m) { this._id_sessoes = m; return this; }

  get tempo_estudado() { return this._tempo_estudado; }
  set tempo_estudado(m) { this._tempo_estudado = m; return this; }

  get data() { return this._data; }
  set data(n) { this._data = n; return this; }

  get id_aluno() { return this._id_aluno; }
  set id_aluno(s) { this._id_aluno = s; return this; }

  async create() {
    const con = await Banco.getConexao();
    const sql = `
      INSERT INTO sessoes_estudo (tempo_estudado, data, id_aluno)
      VALUES (?, ?, ?)`;
    try {
      const [result] = await con.execute(sql, [
        this._tempo_estudado, this._data, this._id_aluno
      ]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Erro ao criar sessão de estudo:", err);
      return false;
    }
  }

  async readAll() {
    const con = await Banco.getConexao();
    try {
      const [rows] = await con.execute("SELECT * FROM sessoes_estudo");
      return rows;
    } catch (err) {
      console.error("Erro ao listar sessões de estudos:", err);
      return [];
    }
  }

  async readByID() {
    const con = await Banco.getConexao();
    try {
      const [rows] = await con.execute("SELECT * FROM sessoes_estudo WHERE id_sessao = ?", [this._id_sessao]);
      return rows[0] || null;
    } catch (err) {
      console.error("Erro ao buscar sessão de estudo:", err);
      return null;
    }
  }

  async readByIdAluno() {
    const con = await Banco.getConexao();
    try {
      const [rows] = await con.execute("SELECT * FROM sessoes_estudo WHERE id_aluno = ?", [this._id_aluno]);
      return rows || null;
    } catch (err) {
      console.error("Erro ao buscar sessão de estudo:", err);
      return null;
    }
  }

  async update() {
    const con = await Banco.getConexao();
    const sql = `
      UPDATE sessoes_estudo SET tempo_estudado = ?, data = ?, id_aluno = ?
      WHERE id_sessao = ?`;
    try {
      const [res] = await con.execute(sql, [
        this._tempo_estudado, this._data, this._id_aluno, this._id_sessao
      ]);
      return res.affectedRows > 0;
    } catch (err) {
      console.error("Erro ao atualizar sessão de estudo:", err);
      return false;
    }
  }

  async delete() {
    const con = await Banco.getConexao();
    try {
      const [res] = await con.execute("DELETE FROM sessoes_estudo WHERE id_sessao = ?", [this._id_sessao]);
      return res.affectedRows > 0;
    } catch (err) {
      console.error("Erro ao excluir sessão de estudo:", err);
      return false;
    }
  }
}

module.exports = SessoesEstudo;