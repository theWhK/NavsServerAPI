const User = require('../models/user');

// LIST
exports.find = function (req, res) {
    User.find(function(err, user) {
        if (err)
            res.send(err);

        res.status(200).json({
            user: user
        })
    })
};

// FIND ONE
exports.findById = function (req, res) {
    User.findById(req.params.id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "Usuário não encontrado com o id: " + req.params.userId
                });            
            }
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Usuário não encontrado com o id: " + req.params.userId
                });                
            }
            return res.status(500).send({
                message: "Ops! Ocorreu um erro ao recuperar o Usuário: " + req.params.userId
            });
        });
};

// CREATE
exports.create = (req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(error) {
        if (error)
            res.send("Erro ao tentar salvar o Usuário");

        res.status(201).json({message: 'Usuário salvo com sucesso'});
    })
};

// UPDATE
exports.update = function (req, res) {
    // Valida se a requisição não esta vazia
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo do Usuário não pode ser vazio"
        });
    }

    // Procura e atualiza o usuario especificado no body da requisição
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "Sem nome",
        email: req.body.email, 
        password: req.body.password

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Usuário não encontrado com o id: " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuário não encontrado com o id: " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Ops! Ocorreu um erro ao atualizar id: " + req.params.userId
        });
    });
};

// DELETE
exports.delete = function (req, res) {
    
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Usuário não encontrado com o id: " + req.params.userId
            });
        }
        res.send({message: "Usuário deletado com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Usuário não encontrado com o id: " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Não foi possível deletar o Usuário com id: " + req.params.userId
        });
    });
};
