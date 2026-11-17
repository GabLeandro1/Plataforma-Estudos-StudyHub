const jwt = require('jsonwebtoken');

// Chave secreta definida diretamente no código
const JWT_SECRET = '123'; // Defina uma chave secreta forte

module.exports = class JWTMiddleware {
  validate(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]; // Pega o token após 'Bearer'

      // Verifica a validade do token com a chave secreta definida diretamente
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error('Token inválido:', err.message);
          return res.status(401).json({ status: false, msg: 'Token inválido' });
        }

        // Se o token for válido, adiciona o payload ao objeto req
        req.usuario = decoded;  // O payload do token é salvo em req.usuario
        next();  // Continua para a próxima função ou rota
      });
    } else {
      return res.status(401).json({ status: false, msg: 'Token não fornecido' });
    }
  }
};
