// Núcleo
const express = require('express');
var router = express.Router();

// Controller em voga
const controller = require('../app/controllers/product-controller');

// Rotas
router.get(     '/',                    controller.find);
router.get(     '/:productId',          controller.findById);
router.post(    '/',                    controller.create);
router.post(    '/edit/:productId',     controller.update);
router.get(     '/delete/:productId',   controller.delete);

module.exports = router;