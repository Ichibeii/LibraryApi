const express = require('express');
const usuariosComPendenciasController = require('../controllers/usuariosComPendenciasController');
const router = express.Router();

router.get('/', usuariosComPendenciasController.getUsuariosComPendencias);

module.exports = router;
