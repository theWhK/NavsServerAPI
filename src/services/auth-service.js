const jwt = require('jsonwebtoken');

//Gerar/Codificar Token
exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {expireIn: '1d'});
}

//Decodificar Token
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY); 
}

//Middleware interceptor
exports.authorize = function (req, res, next){
    //1 passo - busco o token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message:'Acesso restrito'
        });
    }else{
        //Token encontrado. Verificar Token.
        jwt.verify(token, global.SALT_KEY, function(error, decode){
            if(error){ //não conseguiu decodificar
                res.status(401).json({
                    message:'Token inválido'
                });
            }else{
                next();
            }
        });
    }

}