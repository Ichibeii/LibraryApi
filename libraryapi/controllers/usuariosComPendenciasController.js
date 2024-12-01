const usuariosComPendencias = require('../models/usuarios_com_pendencias');

// Obter todos os usuários com pendências
exports.getUsuariosComPendencias = async (req, res) => {
  try {
    const usuarios = await usuariosComPendencias.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários com pendências:', error);
    res.status(500).json({ error: error.message });
  }
};
