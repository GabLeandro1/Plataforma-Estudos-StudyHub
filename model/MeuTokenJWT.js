const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class MeuTokenJWT {
  constructor() {
    this._key = "x9S4q0v+V0IjvHkG20uAxaHx1ijj+q1HWjHKv+ohxp/oK+77qyXkVj/l4QYHHTF3";
    this._alg = 'HS256';
    this._type = 'JWT';
    this._iss = 'http://localhost';
    this._aud = 'http://localhost';
    this._sub = "acesso_sistema";
    this._duracaoToken = 3600 * 24 * 30; // 30 dias em segundos
    this.payload = null;
  }

  gerarToken(claims = {}) {
    const headers = {
      alg: this._alg,
      typ: this._type,
    };

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      iss: this._iss,
      aud: this._aud,
      sub: this._sub,
      iat: now,
      exp: now + this._duracaoToken,
      nbf: now,
      jti: crypto.randomBytes(16).toString('hex'),
      ...claims, // adiciona claims extras, ex: email, password
    };

    return jwt.sign(payload, this._key, { algorithm: this._alg, header: headers });
  }

  validarToken(token) {
    if (!token || typeof token !== 'string' || token.trim() === '') {
      return false;
    }

    // Remove "Bearer " caso exista
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token.trim();

    try {
      const decoded = jwt.verify(cleanToken, this._key, { algorithms: [this._alg] });
      this.payload = decoded;
      return true;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        console.error('Token expirado');
      } else if (err instanceof jwt.JsonWebTokenError) {
        console.error('Token inválido');
      } else {
        console.error('Erro ao validar token:', err);
      }
      return false;
    }
  }

  getPayload() {
    return this.payload;
  }

  setPayload(payload) {
    this.payload = payload;
  }
}

module.exports = MeuTokenJWT;
