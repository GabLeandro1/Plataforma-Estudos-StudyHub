module.exports = class SessoesEstudoMiddleware {
  async validarCamposObrigatorios(req, res, next) {
        const sessao = req.body.sessao;
        if (!sessao) {
        return res.status(400).json({ cod: 0, status: false, msg: "Dados da sessão são obrigatórios" });
        }

        if (!sessao.tempo_estudado) {
        return res.status(400).json({ cod: 2, status: false, msg: "É necessário que se saiba o tempo estudado" });
        }

        if (!sessao.data) {
        return res.status(400).json({ cod: 2, status: false, msg: "É necessário que se saiba a data da sessão de estudo" });
        }

        if (!sessao.id_aluno) {
        return res.status(400).json({ cod: 2, status: false, msg: "É necessário saber qual foi o aluno que fez a sessão de estudo" });
        }
    }
}