module.exports = class CategoriaMiddleware {
  async validarCamposObrigatorios(req, res, next) {
    const categoria = req.body.categoria;

    if (!categoria) {
      return res.status(400).json({ cod: 0, status: false, msg: "Dados da categoria são obrigatórios" });
    }

    if (!categoria.id_aluno) {
      return res.status(400).json({ cod: 3, status: false, msg: "O id do aluno é obrigatório" });
    }

    if (!categoria.id_categoria_pai) {
      return res.status(400).json({ cod: 3, status: false, msg: "O id da categoria pai é obrigatório" });
    }

    if (!categoria.nome || String(card.nome).trim().length < 3) {
      return res.status(400).json({ cod: 4, status: false, msg: "O nome da categoria deve ter ao menos 3 caracteres" });
    }
    next();
  }
}
