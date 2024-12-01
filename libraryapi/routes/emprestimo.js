const express = require('express');
const emprestimoController = require('../controllers/emprestimoController');
const router = express.Router();

router.get('/', emprestimoController.getAllEmprestimos);
router.get('/:id_emprestimo', emprestimoController.getEmprestimoById);
router.post('/', emprestimoController.createEmprestimo);
router.put('/:id_emprestimo', emprestimoController.updateEmprestimo);
router.delete('/:id_emprestimo', emprestimoController.deleteEmprestimo);

module.exports = router;
