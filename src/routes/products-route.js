const express = require('express');
var router = express.Router();//intercepta todas as rotas
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

//GETBYID
//localhost:3000/products/5b3405fcc712400cfcc61a39
router.get('/:productId', controller.getById);

//PUT - atualizar um produto passando os novos dados e o id do produto a ser atualizado.
//Verbo PUT -  Ex.: localhost:3000/products/5b3405fcc712400cfcc61a39
router.put('/:productId',controller.put);

//DELETE - deletar um produto passando o id do produto a ser removido.
//localhost:3000/products/5b3405fcc712400cfcc61a39
router.delete('/:productId', controller.delete);

//POST para produtos (CREATE)
//localhost:3000/products
router.post('/', authService.authorize, controller.post);

//READ ou GET-ALL
//localhost:3000/products 
router.get('/', controller.getAll);

module.exports = router;