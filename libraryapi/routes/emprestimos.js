const express = require('express');
const emprestimoController = require('../controllers/emprestimoController');
const router = express.Router();

router.get('/', emprestimoController.getAllEmprestimos);
router.get('/:emprestimoId', emprestimoController.getEmprestimoById);
router.post('/', emprestimoController.createEmprestimo);
router.put('/:emprestimoId', emprestimoController.updateEmprestimo);
router.delete('/:emprestimoId', emprestimoController.deleteEmprestimo);

module.exports = router;
