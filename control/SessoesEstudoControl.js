const jwt = require('jsonwebtoken');
const SessoesEstudo = require('../model/SessoesEstudo');
const JWT_SECRET = '123';

class SessoesEstudoControl {
  async readAll(req, res) {
    try {
      const sessao = new SessoesEstudo();
      const sessoes = await sessao.readAll();
      res.status(200).json({ status: true, sessoes });
    } catch (err) {
      console.error("Erro ao listar sessões de estudos:", err);
      res.status(500).json({ status: false, msg: "Erro interno." });
    }
  }

  async readById(req, res) {
    try {
      const sessao = new SessoesEstudo();
      sessao.id_sessao = req.params.id_sessao;
      const dados = await sessao.readByID();
      if (!dados) return res.status(404).json({ status: false, msg: "Sessão não encontrado." });
      res.status(200).json({ status: true, sessao: dados });
    } catch (err) {
      res.status(500).json({ status: false, msg: "Erro interno." });
    }
  }

  async readByIdAluno(req, res) {
    try {
      const sessao = new SessoesEstudo();
      sessao.id_aluno = req.params.id_aluno;
      const dados = await sessao.readByIdAluno();
      if (!dados) return res.status(404).json({ status: false, msg: "Sessão não encontrado." });
      res.status(200).json({ status: true, sessao: dados });
    } catch (err) {
      res.status(500).json({ status: false, msg: "Erro interno." });
    }
  }

  async create(req, res) {
    try {
      const { tempo_estudado, id_aluno } = req.body;
      const sessao = new SessoesEstudo()
      sessao.tempo_estudado = tempo_estudado;
      sessao.id_aluno = id_aluno;
      sessao.data = new Date().toLocaleDateString('pt-BR');
      const criado = await sessao.create();
      res.status(201).json({
        status: criado,
        msg: criado ? "Sessão criada com sucesso." : "Erro ao criar sessão."
      });
    } catch (err) {
      res.status(500).json({ status: false, msg: "Erro interno ao criar sessão." });
    }
  }

  async update(req, res) {
    try {      
        sessao.id_sessao = req.params.id_sessao;

        const { id_aluno, tempo_estudado, data } = req.body.sessao;

        const card = new Card();
        card.id_aluno = id_aluno;
        card.tempo_estudado = tempo_estudado;
        card.data = data;

        const atualizado = await sessao.update();
        return res.status(200).send({
            cod: atualizado ? 1 : 0,
            status: atualizado,
            msg: atualizado ? "Atualizado com sucesso" : "Erro ao atualizar"
        });
    } catch (err) {
      res.status(500).json({ status: false, msg: "Erro interno ao atualizar sessão." });
    }
  }

  async delete(req, res) {
    try {
      const sessao = new SessoesEstudo();
      sessao.id_sessao = req.params.id_sessao;
      const excluido = await sessao.delete();

      res.status(200).json({
        status: excluido,
        msg: excluido ? "Sessão excluída com sucesso." : "Erro ao excluir sessão."
      });
    } catch (err) {
      res.status(500).json({ status: false, msg: "Erro interno ao excluir sessão." });
    }
  }
}

module.exports = SessoesEstudoControl;