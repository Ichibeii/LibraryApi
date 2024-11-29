const express = require('express');
const livroController = require('../controllers/livroController');
const router = express.Router();

router.get('/', livroController.getAllLivros);
router.get('/:livroId/:emprestimoId/:usuarioId', livroController.getLivroById);
router.post('/', livroController.createLivro);
router.put('/:livroId/:emprestimoId/:usuarioId', livroController.updateLivro);
router.delete('/:livroId/:emprestimoId/:usuarioId', livroController.deleteLivro);

module.exports = router;
