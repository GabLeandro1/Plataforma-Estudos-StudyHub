module.exports = class CardMiddleware {
  async validarCamposObrigatorios(req, res, next) {
    const card = req.body.card;

    if (!card) {
      return res.status(400).json({ cod: 0, status: false, msg: "Dados do card são obrigatórios" });
    }

    if (!card.id_aluno) {
      return res.status(400).json({ cod: 3, status: false, msg: "O id do aluno é obrigatório" });
    }

    if (!card.id_categoria) {
      return res.status(400).json({ cod: 3, status: false, msg: "O id da categoria é obrigatório" });
    }

    if (!card.pergunta || String(card.pergunta).trim().length < 3) {
      return res.status(400).json({ cod: 4, status: false, msg: "A pergunta deve ter ao menos 3 caracteres" });
    }
    
    if (!card.resposta || String(card.resposta).trim().length < 3) {
      return res.status(400).json({ cod: 4, status: false, msg: "A resposta deve ter ao menos 3 caracteres" });
    }
    next();
  }
}
