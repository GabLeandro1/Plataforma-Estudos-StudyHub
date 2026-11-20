const Banco = require('./Banco');

class Aluno {
  constructor() {
    this._id_aluno = null;
    this._email = null;
    this._nome = null;
    this._senha = null;
    this._data_cadastro = null;
  }

  get id_aluno() { return this._id_aluno; }
  set id_aluno(m) { this._id_aluno = m; return this; }

  get email() { return this._email; }
  set email(m) { this._email = m; return this; }

  get nome() { return this._nome; }
  set nome(n) { this._nome = n; return this; }

  get senha() { return this._senha; }
  set senha(s) { this._senha = s; return this; }

  get data_cadastro() { return this._data_cadastro; }
  set data_cadastro(s) { this._data_cadastro = s; return this; }

  async create() {
    const con = await Banco.getConexao();
    const sql = `
      INSERT INTO alunos (nome, email, senha, data_cadastro)
      VALUES (?, ?, ?, ?)`;
    try {
      const [result] = await con.execute(sql, [
        this._nome, this._email, this._senha, this._data_cadastro
      ]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Erro ao criar aluno:", err);
      return false;
    }
  }

  async readAll() {
    const con = await Banco.getConexao();
    try {
      const [rows] = await con.execute("SELECT * FROM alunos");
      return rows;
    } catch (err) {
      console.error("Erro ao listar alunos:", err);
      return [];
    }
  }

  async readByID() {
    const con = await Banco.getConexao();
    try {
      const [rows] = await con.execute("SELECT * FROM alunos WHERE id_aluno = ?", [this._id_aluno]);
      return rows[0] || null;
    } catch (err) {
      console.error("Erro ao buscar aluno:", err);
      return null;
    }
  }

  async readByEmailSenha() {
    const con = await Banco.getConexao();
    try {
      const [rows] = await con.execute("SELECT * FROM alunos WHERE email = ? AND senha = ?", [this._email, this._senha]);
      return rows[0] || null;
    } catch (err) {
      console.error("Erro ao buscar aluno:", err);
      return null;
    }
  }

  async autenticar() {
    const con = await Banco.getConexao();
    try {
      const [rows] = await con.execute("SELECT COUNT(*) AS qtd FROM alunos WHERE email = ? AND senha = ?", [this._email, this._senha]);
      return rows[0].qtd > 0;
    } catch (err) {
      console.error("Erro na autenticação:", err);
      return false;
    }
  }

  async update() {
    const con = await Banco.getConexao();
    const sql = `
      UPDATE alunos SET nome = ?, senha = ?, email = ?
      WHERE id_aluno = ?`;
    try {
      const [res] = await con.execute(sql, [
        this._nome, this._senha, this._email, this._id_aluno
      ]);
      return res.affectedRows > 0;
    } catch (err) {
      console.error("Erro ao atualizar aluno:", err);
      return false;
    }
  }

  async updateImagem(imagem) {
    const con = await Banco.getConexao();
    const sql = `
        UPDATE alunos
        SET imagem_perfil = ?
        WHERE id_aluno = ?
    `;
    try {
      const [res] = await con.execute(sql, [
          imagem,
          this._id_aluno
      ]);

      return res.affectedRows > 0;
    } catch (err) {
      console.error("Erro ao atualizar imagem:", err);
      return false;
    }
  }

  async delete() {
    const con = await Banco.getConexao();
    try {
      const [res] = await con.execute("DELETE FROM alunos WHERE id_aluno = ?", [this._id_aluno]);
      return res.affectedRows > 0;
    } catch (err) {
      console.error("Erro ao excluir aluno:", err);
      return false;
    }
  }
}

module.exports = Aluno;
