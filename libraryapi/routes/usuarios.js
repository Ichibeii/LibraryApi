const express = require('express');
const { body } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Validações para atualizar o usuário
const validarAtualizacaoUsuario = [
  body('nome').notEmpty().withMessage('O nome é obrigatório'),
  body('email').isEmail().withMessage('E-mail inválido'),
  body('telefone')
    .isLength({ min: 9, max: 15 })
    .withMessage('Telefone deve ter entre 9 e 15 caracteres'),
];

// Rota para pegar todos os usuários (apenas para usuários autenticados)
router.get('/', verifyToken, usuarioController.getAllUsuarios);

// Rota para pegar usuário por ID (apenas para usuários autenticados)
router.get('/:id_usuario', verifyToken, usuarioController.getUsuarioById);

// Rota para atualizar um usuário (apenas para usuários autenticados e com validação)
router.put(
  '/:id_usuario',
  verifyToken,
  validarAtualizacaoUsuario,
  usuarioController.updateUsuario
);

// Rota para atualizar a senha do usuário (apenas para usuários autenticados)
router.put('/:id_usuario/senha', verifyToken, usuarioController.updateSenha);

// Rota para deletar um usuário (apenas para administradores)
router.delete('/:id_usuario', verifyToken, usuarioController.deleteUsuario);

module.exports = router;
