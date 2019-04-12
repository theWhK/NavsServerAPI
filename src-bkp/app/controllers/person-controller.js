const Person = require('../models/person');

/**
 * List all records
 */
exports.find = function (req, res) {
    Person
    .find(function(err,items) {
        if (err)
            res.send(err);

        res.status(200).json({
            pessoas: items
        })
    })
    .populate('profissao', 'descricao -_id')
    .select('nome cpf profissao');
};

/**
 * Find a specific record
 */
exports.findById = function (req, res) {
    Person
    .findById(req.params.id)
    .populate('profissao', 'descricao -_id')
    .select('nome cpf profissao')
        .then(item => {
            if(!item) {
                return res.status(404).send({
                    message: "Pessoa não encontrada com o id: " + req.params.id
                });            
            }
            res.send(item);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pessoa não encontrada com o id: " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Ops! Ocorreu um erro ao recuperar a Pessoa: " + req.params.id
            });
        });
        
};

/**
 * Create a new record
 */
exports.create = function (req, res) {
    var Person = new Person();
    Person.nome = req.body.nome;
    Person.cpf = req.body.cpf;
    Person.profissao = req.body.profissao

    Person.save(function(error) {
        if (error)
            res.send("Erro ao tentar salvar a pessoa");

        res.status(201).json({message: 'Pessoa salva com sucesso'});
    })
};

/**
 * Update an existing record
 */
exports.update = function (req, res) {
    // Valida se a requisição não está vazia
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo da pessoa não pode ser vazio"
        });
    }

    // Procura e atualiza o Person especificado no body da requisição
    Person.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        cpf: req.body.cpf,
        profissao: req.body.profissao
                    
    }, {new: true})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Pessoa não encontrada com o id: " + req.params.id
            });
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pessoa não encontrada com o id: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Ops! Ocorreu um erro ao atualizar pessoa com id: " + req.params.id
        });
    });
};

/**
 * Destroy a record
 */
exports.delete = function (req, res) {
    
    Person.findByIdAndRemove(req.params.id)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Pessoa não encontrada com o id: " + req.params.id
            });
        }
        res.send({message: "Pessoa deletada com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Pessoa não encontrada com o id: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Não foi possível deletar a Pessoa com id: " + req.params.id
        });
    });
};
