// Núcleo
const express = require('express');
var router = express.Router();

// Middleware
router.use(function(req, res, next) {
    console.log("middleware");
    next();
});

// Rotas
router.get('/', (req, res) => res.json({"message": "Index"}));

module.exports = router;