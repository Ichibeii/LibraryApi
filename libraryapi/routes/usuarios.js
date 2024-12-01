const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', usuarioController.getAllUsuarios);
router.get('/:id_usuario', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id_usuario', usuarioController.updateUsuario);
router.delete('/:id_usuario', usuarioController.deleteUsuario);

module.exports = router;
