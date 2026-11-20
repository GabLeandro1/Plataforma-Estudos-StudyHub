
module.exports = class CategoriaMiddleware {
  async validarCamposObrigatorios(req, res, next) {
    const categoria = req.body;

    if (!categoria.id_aluno) {
      return res.status(400).json({
        cod: 3,
        status: false,
        msg: "O id do aluno é obrigatório"
      });
    }

    // A categoria pai pode ser null, pois uma categoria
    // pode ser criada sem possuir uma categoria superior.

    if (!categoria.nome || String(categoria.nome).trim().length < 3) {
      return res.status(400).json({
        cod: 4,
        status: false,
        msg: "O nome da categoria deve ter ao menos 3 caracteres"
      });
    }

    next();
  }
}