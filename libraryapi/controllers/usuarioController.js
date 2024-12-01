const usuarios = require('../models/usuarios');

// Obter todos os usuários
exports.getAllUsuarios = async (req, res) => {
  try {
    const todosUsuarios = await usuarios.findAll();
    res.json(todosUsuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obter usuário por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const usuario = await usuarios.findByPk(id_usuario);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo usuário
exports.createUsuario = async (req, res) => {
  try {
    const { nome, endereco, email, telefone } = req.body;
    const novoUsuario = await usuarios.create({ nome, endereco, email, telefone });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um usuário
exports.updateUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { nome, endereco, email, telefone } = req.body;
    const usuario = await usuarios.findByPk(id_usuario);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    await usuario.update({ nome, endereco, email, telefone });
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: error.message });
  }
};

// Deletar um usuário
exports.deleteUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const usuario = await usuarios.findByPk(id_usuario);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    await usuario.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: error.message });
  }
};
