
const Aluno = require('../model/Aluno');
const MeuTokenJWT = require('../model/MeuTokenJWT');

class AlunoControl {

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const aluno = new Aluno();
            aluno.email = email;
            aluno.senha = senha;

            if (!await aluno.autenticar()) {
                return res.status(401).json({
                    status: false,
                    msg: 'Email ou senha inválido.'
                });
            }

            const dados = await aluno.readByEmailSenha();

            const tokenJWT = new MeuTokenJWT();

            const claims = {
                id_aluno: dados.id_aluno
            };

            const accessToken = tokenJWT.gerarToken(claims);
            const refreshToken = tokenJWT.gerarRefreshToken(claims);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // true em produção com HTTPS
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/'
            });

            return res.status(200).json({
                status: true,
                token: accessToken,
                aluno: dados
            });

        } catch (err) {
            console.error('Erro no login:', err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno no servidor.'
            });
        }
    }

    async refresh(req, res) {
        try {
            const refreshToken = req.cookies?.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({
                    status: false,
                    msg: 'Refresh Token não encontrado.'
                });
            }

            const tokenJWT = new MeuTokenJWT();

            const novoAccessToken =
                tokenJWT.renovarAccessToken(refreshToken);

            if (!novoAccessToken) {
                res.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    path: '/'
                });

                return res.status(401).json({
                    status: false,
                    msg: 'Sessão expirada. Faça login novamente.'
                });
            }

            return res.status(200).json({
                status: true,
                token: novoAccessToken
            });

        } catch (err) {
            console.error('Erro ao renovar token:', err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao renovar token.'
            });
        }
    }

    async logout(req, res) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
        });

        return res.status(200).json({
            status: true,
            msg: 'Logout realizado com sucesso.'
        });
    }

    async readAll(req, res) {
        try {
            const aluno = new Aluno();
            const alunos = await aluno.readAll();

            return res.status(200).json({
                status: true,
                alunos
            });

        } catch (err) {
            console.error(err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno.'
            });
        }
    }

    async readById(req, res) {
        try {
            const aluno = new Aluno();
            aluno.id_aluno = req.params.id_aluno;

            const dados = await aluno.readByID();

            if (!dados) {
                return res.status(404).json({
                    status: false,
                    msg: 'Aluno não encontrado.'
                });
            }

            if (dados.Imagem_Perfil_Aluno) {
                dados.Imagem_Perfil_Aluno =
                    dados.Imagem_Perfil_Aluno.toString('base64');
            }

            return res.status(200).json({
                status: true,
                aluno: dados
            });

        } catch (err) {
            console.error(err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno.'
            });
        }
    }

    async create(req, res) {
        try {
            const data = new Date();
            const { nome, senha, email } = req.body;

            const aluno = new Aluno();

            aluno.nome = nome;
            aluno.senha = senha;
            aluno.email = email;
            aluno.data_cadastro = data.toISOString().split('T')[0];

            const criado = await aluno.create();

            return res.status(201).json({
                status: criado,
                msg: criado
                    ? 'Aluno criado com sucesso.'
                    : 'Erro ao criar aluno.'
            });

        } catch (err) {
            console.error(err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao criar aluno.'
            });
        }
    }

    async update(req, res) {
        try {
            const aluno = new Aluno();

            aluno.id_aluno = req.params.id_aluno;

            const dados = await aluno.readByID();

            if (!dados) {
                return res.status(404).json({
                    status: false,
                    msg: 'Aluno não encontrado.'
                });
            }

            const { senhaAtual, novaSenha } = req.body;

            if (senhaAtual && novaSenha) {
                aluno.email = dados.email;
                aluno.senha = senhaAtual;

                if (!await aluno.autenticar()) {
                    return res.status(401).json({
                        status: false,
                        msg: 'Senha atual incorreta.'
                    });
                }

                aluno.nome = dados.nome;
                aluno.email = dados.email;
                aluno.data_cadastro = dados.data_cadastro;
                aluno.senha = novaSenha;

            } else {
                aluno.nome = dados.nome;
                aluno.email = dados.email;
                aluno.senha = dados.senha;
                aluno.data_cadastro = dados.data_cadastro;
            }

            const atualizado = await aluno.update();

            return res.status(200).json({
                status: atualizado,
                msg: atualizado
                    ? 'Aluno atualizado com sucesso.'
                    : 'Nenhuma alteração realizada.'
            });

        } catch (err) {
            console.error(err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao atualizar aluno.'
            });
        }
    }

    async delete(req, res) {
        try {
            const aluno = new Aluno();
            aluno.id_aluno = req.params.id_aluno;

            const excluido = await aluno.delete();

            return res.status(200).json({
                status: excluido,
                msg: excluido
                    ? 'Aluno excluído com sucesso.'
                    : 'Erro ao excluir aluno.'
            });

        } catch (err) {
            console.error(err);

            return res.status(500).json({
                status: false,
                msg: 'Erro interno ao excluir aluno.'
            });
        }
    }
}

module.exports = AlunoControl;