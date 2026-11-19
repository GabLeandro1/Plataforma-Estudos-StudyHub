const MeuTokenJWT = require('../model/MeuTokenJWT');

module.exports = class JWTMiddleware {
    constructor() {
        this._jwt = new MeuTokenJWT();
    }

    validate = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: false,
                msg: 'Token não fornecido.'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!this._jwt.validarToken(token, 'access')) {
            return res.status(401).json({
                status: false,
                msg: 'Token inválido ou expirado.'
            });
        }

        // Disponibiliza os dados do usuário para os controllers.
        req.usuario = this._jwt.getPayload();

        next();
    };
};