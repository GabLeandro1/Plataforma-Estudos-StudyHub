const Card = require('../model/Card');

module.exports = class CardControl {
    async readAll(req, res) {
        const card = new Card();
        const dados = await card.readAll();
        return res.status(200).send({ cod: 1, status: true, cards: dados });
    }

    async readByIdCard(req, res) {
        const card = new Card();
        card.id_card = req.params.id_card;
        const dados = await card.readByIDCard();
        return res.status(200).send({ cod: 1, status: true, card: dados });
    }

    async readByIdAluno(req, res) {
        const card = new Card();
        card.id_aluno = req.params.id_aluno;
        const dados = await card.readByIDAluno();
        return res.status(200).send({ cod: 1, status: true, card: dados });
    }

    async readByIdCategoria(req, res) {
        const card = new Card();
        card.id_categoria = req.params.id_categoria;
        const dados = await card.readByIDCategoria();
        return res.status(200).send({ cod: 1, status: true, card: dados });
    }

    async create(req, res) {
        const data = new Date();

        const { id_aluno, id_categoria, pergunta, resposta } = req.body.card;

        const card = new Card();
        card.id_aluno = id_aluno;
        card.id_categoria = id_categoria;
        card.pergunta = pergunta;
        card.resposta = resposta;
        card.data_criacao = data.toISOString().split('T')[0];
        

        const criado = await card.create();
        return res.status(201).send({
            cod: criado ? 1 : 0,
            status: criado,
            msg: criado ? "Card cadastrado" : "Erro ao cadastrar card"
        });
    }

    async update(req, res) {
        card.id_card = req.params.id_card;

        const { id_aluno, id_categoria, pergunta, resposta } = req.body.card;

        const card = new Card();
        card.id_aluno = id_aluno;
        card.id_categoria = id_categoria;
        card.pergunta = pergunta;
        card.resposta = resposta;

        const atualizado = await card.update();
        return res.status(200).send({
            cod: atualizado ? 1 : 0,
            status: atualizado,
            msg: atualizado ? "Atualizado com sucesso" : "Erro ao atualizar"
        });
    }

    async delete(req, res) {
        const card = new Card();
        card.id_card = req.params.id_card;
        const excluido = await card.delete();
        return res.status(200).send({
            cod: excluido ? 1 : 0,
            status: excluido,
            msg: excluido ? "Deletado com sucesso" : "Erro ao deletar"
        });
    }
}
