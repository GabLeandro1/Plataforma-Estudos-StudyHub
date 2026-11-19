
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class MeuTokenJWT {
    constructor() {
        this._keyAccess = "x9S4q0v+V0IjvHkG20uAxaHx1ijj+q1HWjHKv+ohxp/oK+77qyXkVj/l4QYHHTF3";
        this._keyRefresh = "x9S4q0v+V0IjvHkG20uAxaHx1ijj+q1HWjHKv+ohxp/oK+77qyXkVj/l4QYHHTF3";

        this._alg = 'HS256';
        this._type = 'JWT';
        this._iss = 'http://localhost';
        this._aud = 'http://localhost';
        this._sub = 'acesso_sistema';

        this._duracaoAccess = 60 * 15; // 15 minutos
        this._duracaoRefresh = 60 * 60 * 24 * 7; // 7 dias

        this.payload = null;
    }

    criarToken(claims, tipo, duracao, chave) {
        const now = Math.floor(Date.now() / 1000);

        const payload = {
            ...claims,

            iss: this._iss,
            aud: this._aud,
            sub: this._sub,

            iat: now,
            exp: now + duracao,
            nbf: now,

            jti: crypto.randomBytes(16).toString('hex'),
            token_use: tipo
        };

        return jwt.sign(payload, chave, {
            algorithm: this._alg,
            header: {
                alg: this._alg,
                typ: this._type
            }
        });
    }

    gerarToken(claims = {}) {
        return this.criarToken(
            claims,
            'access',
            this._duracaoAccess,
            this._keyAccess
        );
    }

    gerarRefreshToken(claims = {}) {
        return this.criarToken(
            claims,
            'refresh',
            this._duracaoRefresh,
            this._keyRefresh
        );
    }

    validarToken(token, tipo = 'access') {
        if (!token || typeof token !== 'string' || !token.trim()) {
            return false;
        }

        const cleanToken = token.startsWith('Bearer ')
            ? token.slice(7).trim()
            : token.trim();

        const chave = tipo === 'refresh'
            ? this._keyRefresh
            : this._keyAccess;

        try {
            const decoded = jwt.verify(cleanToken, chave, {
                algorithms: [this._alg],
                issuer: this._iss,
                audience: this._aud,
                subject: this._sub
            });

            if (decoded.token_use !== tipo) {
                return false;
            }

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

    renovarAccessToken(refreshToken) {
        if (!this.validarToken(refreshToken, 'refresh')) {
            return null;
        }

        const dados = this.getPayload();

        // Não copiar as claims reservadas do token anterior.
        const {
            iss, aud, sub, iat, exp, nbf, jti, token_use,
            ...claims
        } = dados;

        return this.gerarToken(claims);
    }

    getPayload() {
        return this.payload;
    }

    setPayload(payload) {
        this.payload = payload;
    }
}

module.exports = MeuTokenJWT;
