const express = require('express');
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const router = express.Router();

// Registro
router.post(
  '/register',
  [
    body('nome').notEmpty().withMessage('O nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('senha')
      .isLength({ min: 6 })
      .withMessage('A senha deve ter pelo menos 6 caracteres'),
    body('telefone').isLength({ min: 10, max: 15 }).withMessage('Telefone deve ter entre 10 e 15 caracteres'),
  ],
  authController.register
);

// Login
router.post('/login', authController.login);

// Logout
router.post('/logout', authController.logout);


module.exports = router;
