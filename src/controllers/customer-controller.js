
const repository = require('../repositories/customer-repository');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.getAll();
        res.status(200).send({
            message: 'Clientes',
            clientes: data
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message
        });
    }
};


exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email:req.body.email,
            password:req.body.password
        });

        if(!customer){
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer.id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data:{
                email:customer.email,
                name:customer.name
            }
        });

    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
        });
    }
}
