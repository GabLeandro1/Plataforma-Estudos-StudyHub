const SessoesEstudo = require('../model/SessoesEstudo');

module.exports = class SessoesEstudoControl {

    async readAll(req, res) {
        try {
            const sessao = new SessoesEstudo();
            const sessoes = await sessao.readAll();

            return res.status(200).json({
                status: true,
                sessoes
            });

        } catch (err) {
            console.error('Erro ao listar sessões de estudo:', err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao listar sessões.'
            });
        }
    }

    async readById(req, res) {
        try {
            const sessao = new SessoesEstudo();
            sessao.id_sessao = req.params.id_sessao;

            const dados = await sessao.readByID();

            if (!dados) {
                return res.status(404).json({
                    status: false,
                    msg: 'Sessão não encontrada.'
                });
            }

            return res.status(200).json({
                status: true,
                sessao: dados
            });

        } catch (err) {
            console.error('Erro ao buscar sessão:', err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao buscar sessão.'
            });
        }
    }

    async readByIdAluno(req, res) {
        try {
            const sessao = new SessoesEstudo();
            sessao.id_aluno = req.params.id_aluno;

            const dados = await sessao.readByIdAluno();

            return res.status(200).json({
                status: true,
                sessao: dados
            });

        } catch (err) {
            console.error('Erro ao buscar sessões do aluno:', err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao buscar sessões do aluno.'
            });
        }
    }

    async create(req, res) {
        try {
            const data = new Date();

            const { tempo_estudado, id_aluno } = req.body;

            const sessao = new SessoesEstudo();

            sessao.tempo_estudado = tempo_estudado;
            sessao.id_aluno = id_aluno;
            sessao.data = data.toISOString().split('T')[0];

            const criado = await sessao.create();

            return res.status(201).json({
                status: criado,
                msg: criado
                    ? 'Sessão criada com sucesso.'
                    : 'Erro ao criar sessão.'
            });

        } catch (err) {
            console.error('Erro ao criar sessão:', err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao criar sessão.'
            });
        }
    }

    async update(req, res) {
        try {
            const sessao = new SessoesEstudo();

            sessao.id_sessao = req.params.id_sessao;

            const { id_aluno, tempo_estudado, data } = req.body.sessao;

            sessao.id_aluno = id_aluno;
            sessao.tempo_estudado = tempo_estudado;
            sessao.data = data;

            const atualizado = await sessao.update();

            return res.status(200).json({
                cod: atualizado ? 1 : 0,
                status: atualizado,
                msg: atualizado
                    ? 'Sessão atualizada com sucesso.'
                    : 'Erro ao atualizar sessão.'
            });

        } catch (err) {
            console.error('Erro ao atualizar sessão:', err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao atualizar sessão.'
            });
        }
    }

    async delete(req, res) {
        try {
            const sessao = new SessoesEstudo();
            sessao.id_sessao = req.params.id_sessao;

            const excluido = await sessao.delete();

            return res.status(200).json({
                status: excluido,
                msg: excluido
                    ? 'Sessão excluída com sucesso.'
                    : 'Erro ao excluir sessão.'
            });

        } catch (err) {
            console.error('Erro ao excluir sessão:', err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao excluir sessão.'
            });
        }
    }
};