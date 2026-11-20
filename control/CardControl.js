const Card = require('../model/Card');

module.exports = class CardControl {

    async readAll(req, res) {
        try {
            const card = new Card();
            const dados = await card.readAll();

            return res.status(200).json({
                cod: 1,
                status: true,
                cards: dados
            });

        } catch (err) {
            console.error('Erro ao listar cards:', err);

            return res.status(500).json({
                cod: 99,
                status: false,
                msg: 'Erro ao listar cards.'
            });
        }
    }

    async readByIdCard(req, res) {
        try {
            const card = new Card();
            card.id_card = req.params.id_card;

            const dados = await card.readByIDCard();

            return res.status(200).json({
                cod: 1,
                status: true,
                card: dados
            });

        } catch (err) {
            console.error('Erro ao buscar card:', err);

            return res.status(500).json({
                cod: 99,
                status: false,
                msg: 'Erro ao buscar card.'
            });
        }
    }

    async readByIdAluno(req, res) {
        try {
            const categoria = new Categoria();

            categoria.id_aluno = req.params.id_aluno;

            const dados = await categoria.readByIdAluno();

            return res.status(200).json({
                cod: 1,
                status: true,
                categoria: dados
            });

        } catch (err) {
            console.error(err);

            return res.status(500).json({
                cod: 0,
                status: false,
                mensagem: 'Erro ao buscar categorias.'
            });
        }
    }

    async readByIdCategoria(req, res) {
        try {
            const card = new Card();
            card.id_categoria = req.params.id_categoria;

            const dados = await card.readByIDCategoria();

            return res.status(200).json({
                cod: 1,
                status: true,
                card: dados
            });

        } catch (err) {
            console.error('Erro ao buscar cards da categoria:', err);

            return res.status(500).json({
                cod: 99,
                status: false,
                msg: 'Erro ao buscar cards da categoria.'
            });
        }
    }

    async readByIdAlunoCategoria(req, res) {
        try {
            const card = new Card();

            card.id_aluno = req.params.id_aluno;
            card.id_categoria = req.params.id_categoria;

            const dados = await card.readByIdAlunoCategoria();

            return res.status(200).json({
                cod: 1,
                status: true,
                card: dados
            });

        } catch (err) {
            console.error('Erro ao buscar cards do aluno e categoria:', err);

            return res.status(500).json({
                cod: 99,
                status: false,
                msg: 'Erro ao buscar cards.'
            });
        }
    }

    async create(req, res) {
        try {
            const data = new Date();

            const { id_aluno, id_categoria, pergunta, resposta } = req.body;

            const card = new Card();

            card.id_aluno = id_aluno;
            card.id_categoria = id_categoria;
            card.pergunta = pergunta;
            card.resposta = resposta;
            card.data_criacao = data.toISOString().split('T')[0];

            const criado = await card.create();

            return res.status(201).json({
                cod: criado ? 1 : 0,
                status: criado,
                msg: criado ? 'Card cadastrado com sucesso.' : 'Erro ao cadastrar card.'
            });

        } catch (err) {
            console.error('Erro ao cadastrar card:', err);

            return res.status(500).json({
                cod: 99,
                status: false,
                msg: 'Erro interno ao cadastrar card.'
            });
        }
    }

    async update(req, res) {
        try {
            const card = new Card();

            card.id_card = req.params.id_card;

            const { id_aluno, id_categoria, pergunta, resposta } = req.body.card;

            card.id_aluno = id_aluno;
            card.id_categoria = id_categoria;
            card.pergunta = pergunta;
            card.resposta = resposta;

            const atualizado = await card.update();

            return res.status(200).json({
                cod: atualizado ? 1 : 0,
                status: atualizado,
                msg: atualizado ? 'Card atualizado com sucesso.' : 'Erro ao atualizar card.'
            });

        } catch (err) {
            console.error('Erro ao atualizar card:', err);

            return res.status(500).json({
                cod: 99,
                status: false,
                msg: 'Erro interno ao atualizar card.'
            });
        }
    }

    async delete(req, res) {
        try {
            const card = new Card();
            card.id_card = req.params.id_card;

            const excluido = await card.delete();

            return res.status(200).json({
                cod: excluido ? 1 : 0,
                status: excluido,
                msg: excluido ? 'Card excluído com sucesso.' : 'Erro ao excluir card.'
            });

        } catch (err) {
            console.error('Erro ao excluir card:', err);

            return res.status(500).json({
                cod: 99,
                status: false,
                msg: 'Erro interno ao excluir card.'
            });
        }
    }
};