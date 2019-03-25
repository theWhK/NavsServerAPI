// Núcleo
const express = require('express');
var router = express.Router();

// Controller em voga
const controller = require('../app/controllers/user-controller');

router.get(     '/',            controller.find);
router.get(     '/:id',         controller.findById);
router.post(    '/',            controller.create);
router.post(    '/edit/:id',    controller.update);
router.get(     '/delete/:id',  controller.delete);

module.exports = router;

