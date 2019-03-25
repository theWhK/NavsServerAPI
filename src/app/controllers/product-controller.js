// Repositório em voga
let repository = require('../repositories/product-repository.js')

/**
 * List all records
 */
exports.getAll = async (req, res) => {
    try {
        let data = await repository.getAll()
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            erro: error
        })
    }
}

/**
 * List a specific record by their id
 */
exports.getById = async (req, res) => {
    try {
        const id = req.params.id
        let data = await repository.getById(id)
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            erro: error
        })
    }
}

// ======================

/**
 * List all records
 */
exports.find = function (req, res) {
    Product.find(function(err,prods) {
        if (err)
            res.send(err);

        res.status(200).json({
            produtos: prods
        })
    })
};

/**
 * Find a specific record
 */
exports.findById = function (req, res) {
    Product.findById(req.params.id)
        .then(item => {
            if(!item) {
                return res.status(404).send({
                    message: "Produto não encontrado com o id: " + req.params.id
                });            
            }
            res.send(item);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Produto não encontrado com o id: " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Ops! Ocorreu um erro ao recuperar o Produto: " + req.params.id
            });
        });
};

/**
 * Create a new record
 */
exports.create = function (req, res) {
    var Product = new Product();
    Product.nome = req.body.nome;
    Product.preco = req.body.preco;
    Product.descricao = req.body.descricao;
    Product.categoria.descricao = req.body.categoria.descricao;

    Product.save(function(error) {
        if (error)
            res.send("Erro ao tentar salvar o Produto");

        res.status(201).json({message: 'Produto salvo com sucesso'});
    })
};

// UPDATE
exports.update = function (req, res) {
    // Valida se a requisição não esta vazia
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo do Produto não pode ser vazio"
        });
    }

    // Procura e atualiza o Product especificado no body da requisição
    Product.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome || "Sem nome",
        preco: req.body.preco, 
        descricao: req.body.descricao,
        categoria: {
            descricao: req.body.categoria.descricao
        }

    }, {new: true})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Produto não encontrado com o id: " + req.params.id
            });
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product não encontrado com o id: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Ops! Ocorreu um erro ao atualizar id: " + req.params.id
        });
    });
};

/**
 * Destroy a record
 */
exports.delete = function (req, res) {
    
    Product.findByIdAndRemove(req.params.id)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Produto não encontrado com o id: " + req.params.id
            });
        }
        res.send({message: "Produto deletado com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Produto não encontrado com o id: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Não foi possível deletar o Produto com id: " + req.params.id
        });
    });
};
