const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const usuarios = require('../models/usuarios');

const secretKey = process.env.SECRET_KEY;

// Registrar um novo usuário
exports.register = async (req, res) => {
  const errors = validationResult(req); // Verificar erros de validação
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nome, endereco, email, telefone, senha } = req.body;

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = await usuarios.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Cria o novo usuário
    const novoUsuario = await usuarios.create({ nome, endereco, email, telefone, senha });
    res.status(201).json({ message: 'Usuário registrado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: error.message });
  }
};

// Fazer login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await usuarios.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, email: usuario.email, role: usuario.role },
      secretKey,  // Usando a SECRET_KEY do .env
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Logout realizado com sucesso' });
};
