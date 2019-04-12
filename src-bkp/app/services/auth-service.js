const jwt = require('jsonwebtoken')

// Codificar token
exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {expireIn: "1d"})
}

// Decodificar token
exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY)
}

// Middleware interceptor
exports.authorize = (req, res, next) => {
    // Busca o token
    let token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) { // Token não encontrado
        res.status(401).json({
            message: "Acesso restrito"
        })
    } else { // Token encontrado
        jwt.verify(token, global.SALT_KEY, function (error, decode) {
            if (error) { // Não conseguiu decodificar
                res.status(401).json({
                    message: "Token inválido"
                })
            } else {
                next()
            }
        })
    }
}