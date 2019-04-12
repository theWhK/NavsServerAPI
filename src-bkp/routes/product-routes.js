// Auth
const authService = require('../app/services/auth-service')

// Núcleo
const express = require('express');
var router = express.Router();

// Controller em voga
const controller = require('../app/controllers/product-controller');

// Rotas
router.get(     '/',                    controller.getAll);
router.get(     '/:productId',          controller.getById);
router.post(    '/',                    controller.store);
router.post(    '/edit/:productId',     controller.put);
router.get(     '/delete/:productId',   controller.delete);

module.exports = router;