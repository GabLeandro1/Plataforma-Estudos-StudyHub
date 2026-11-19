const jwt = require('jsonwebtoken');
const Aluno = require('../model/Aluno');
const JWT_SECRET = '123';

class AlunoControl {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const aluno = new Aluno();
      aluno.email = email;
      aluno.senha = senha;
      if (!await aluno.autenticar()) {
        return res.status(401).json({ status: false, msg: "Email ou senha inválido." });
      }
      const dados = await aluno.readByEmailSenha();
      const token = jwt.sign({ senha }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ status: true, token, aluno: dados });
    } catch (err) {
      console.error("Erro no login:", err);
      res.status(500).json({ status: false, msg: "Erro interno no servidor." });
    }
  }

  async readAll(req, res) {
    try {
      const aluno = new Aluno();
      const alunos = await aluno.readAll();
      res.status(200).json({ status: true, alunos });
    } catch (err) {
      console.error("Erro ao listar alunos:", err);
      res.status(500).json({ status: false, msg: "Erro interno." });
    }
  }

  async readById(req, res) {
    try {
      const aluno = new Aluno();
      aluno.id_aluno = req.params.id;
      const dados = await aluno.readByID();
      if (!dados) return res.status(404).json({ status: false, msg: "Aluno não encontrado." });

      if (dados.Imagem_Perfil_Aluno)
        dados.Imagem_Perfil_Aluno = dados.Imagem_Perfil_Aluno.toString("base64");

      res.status(200).json({ status: true, aluno: dados });
    } catch (err) {
      res.status(500).json({ status: false, msg: "Erro interno." });
    }
  }

  async create(req, res) {
    try {
      const data = new Date();
      const { nome, senha, email } = req.body;
      const aluno = new Aluno()
      aluno.nome = nome;
      aluno.senha = senha;
      aluno.email = email;
      aluno.data_cadastro = data.toISOString().split('T')[0];
      const criado = await aluno.create();
      res.status(201).json({
        status: criado,
        msg: criado ? "Aluno criado com sucesso." : "Erro ao criar aluno."
      });
    } catch (err) {
      res.status(500).json({ status: false, msg: "Erro interno ao criar aluno." });
    }
  }

  async update(req, res) {
    try {
      const aluno = new Aluno();
      aluno.id_aluno = req.params.id_aluno

      const dados = await aluno.readByID();
      if (!dados) return res.status(404).json({ status: false, msg: "Aluno não encontrado." });

      aluno.nome = nome;
      aluno.senha = senha;
      aluno.email = email;
      aluno.data_cadastro = data_cadastro;

      const { senhaAtual, novaSenha } = req.body;

      if (senhaAtual && novaSenha) {
        aluno.senha = senhaAtual;
        if (!await aluno.autenticar())
          return res.status(401).json({ status: false, msg: "Senha atual incorreta." });

        aluno.senha = novaSenha;
      }

      const atualizado = await aluno.update();
      res.status(200).json({
        status: atualizado,
        msg: atualizado ? "Aluno atualizado com sucesso." : "Nenhuma alteração realizada."
      });
    } catch (err) {
      res.status(500).json({ status: false, msg: "Erro interno ao atualizar aluno." });
    }
  }

  async delete(req, res) {
    try {
      const aluno = new Aluno();
      aluno.id_aluno = req.params.id_aluno;
      const excluido = await aluno.delete();

      res.status(200).json({
        status: excluido,
        msg: excluido ? "Aluno excluído com sucesso." : "Erro ao excluir aluno."
      });
    } catch (err) {
      res.status(500).json({ status: false, msg: "Erro interno ao excluir aluno." });
    }
  }
}

module.exports = AlunoControl;