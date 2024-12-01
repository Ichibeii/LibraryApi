
const UsuariosComEmprestimosPendentes = require('../models/usuarios_com_pendencias');

exports.getAllUsuariosPendentes = async (req, res) => {
  try {
    const usuariosPendentes = await UsuariosComEmprestimosPendentes.findAll();
    res.json(usuariosPendentes);
  } catch (error) {
    console.error('Erro ao buscar usuários com empréstimos pendentes:', error);
    res.status(500).json({ error: error.message });
  }
};
