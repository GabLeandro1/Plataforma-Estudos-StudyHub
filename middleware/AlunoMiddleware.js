module.exports = class AlunoMiddleware {
  async validarCamposObrigatorios(req, res, next) {
    const aluno = req.body.aluno;

    if (!aluno) {
      return res.status(400).json({ cod: 0, status: false, msg: "Dados do aluno são obrigatórios" });
    }

    if (!aluno.nome || aluno.nome.trim().length < 3) {
      return res.status(400).json({ cod: 2, status: false, msg: "O nome do aluno deve ter pelo menos 3 caracteres" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!aluno.email || emailRegex.test(aluno.email.trim()) == false) {
      return res.status(400).json({ cod: 4, status: false, msg: "O email não é válido" });
    }

    if (!aluno.senha || aluno.senha.trim().length < 4) {
      return res.status(400).json({ cod: 3, status: false, msg: "A senha deve ter pelo menos 4 caracteres" });
    }
    next();
  }

  async validarNome(req, res, next) {
    const nome = req.body.aluno?.nome;
    if (!nome || nome.trim().length < 3) {
      return res.status(400).json({ cod: 2, status: false, msg: "O nome do aluno deve ter pelo menos 3 caracteres" });
    }
    next();
  }

  async validarSenha(req, res, next) {
    const senha = req.body.aluno?.senha;
    if (!senha || senha.trim().length < 4) {
      return res.status(400).json({ cod: 3, status: false, msg: "A senha deve ter pelo menos 4 caracteres" });
    }
    next();
  }

  async validarEmail(req, res, next) {
    const email = req.body.aluno?.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || emailRegex.test(aluno.email.trim()) == false) {
      return res.status(400).json({ cod: 4, status: false, msg: "O email não pode ser vazio" });
    }
    next();
  }
}