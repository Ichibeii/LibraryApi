const express = require('express');
const livrosMaisEmprestadosController = require('../controllers/livrosMaisEmprestadosController');
const router = express.Router();

router.get('/', livrosMaisEmprestadosController.getLivrosMaisEmprestados);

module.exports = router;
