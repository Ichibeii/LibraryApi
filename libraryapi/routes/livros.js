const express = require('express');
const livroController = require('../controllers/livroController');
const router = express.Router();

router.get('/', livroController.getAllLivros);
router.get('/:id_livro', livroController.getLivroById);
router.post('/', livroController.createLivro);
router.put('/:id_livro', livroController.updateLivro);
router.delete('/:id_livro', livroController.deleteLivro);

module.exports = router;
