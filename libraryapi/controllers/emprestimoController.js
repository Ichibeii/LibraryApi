const Emprestimo = require('../models/emprestimos');
const Usuario = require('../models/usuarios');

exports.getAllEmprestimos = async (req, res) => {
  try {
    const emprestimos = await Emprestimo.findAll({
      include: [{ model: Usuario, attributes: ['nome', 'email'] }],
    });
    res.json(emprestimos);
  } catch (error) {
    console.error('Erro ao buscar empréstimos:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getEmprestimoById = async (req, res) => {
  try {
    const { emprestimoId } = req.params;

    const emprestimo = await Emprestimo.findByPk(emprestimoId, {
      include: [{ model: Usuario, attributes: ['nome', 'email'] }],
    });

    if (!emprestimo) {
      return res.status(404).json({ message: 'Empréstimo não encontrado' });
    }

    res.json(emprestimo);
  } catch (error) {
    console.error('Erro ao buscar empréstimo:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createEmprestimo = async (req, res) => {
  try {
    const { UsuarioId, LivroId, dataEmprestimo, dataDevolucao, status, Usuario_UsuarioId } = req.body;

    const novoEmprestimo = await Emprestimo.create({
      UsuarioId,
      LivroId,
      dataEmprestimo,
      dataDevolucao,
      status,
      Usuario_UsuarioId,
    });

    res.status(201).json(novoEmprestimo);
  } catch (error) {
    console.error('Erro ao criar empréstimo:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmprestimo = async (req, res) => {
  try {
    const { emprestimoId } = req.params;
    const { UsuarioId, LivroId, dataEmprestimo, dataDevolucao, status, Usuario_UsuarioId } = req.body;

    const emprestimo = await Emprestimo.findByPk(emprestimoId);

    if (!emprestimo) {
      return res.status(404).json({ message: 'Empréstimo não encontrado' });
    }

    await emprestimo.update({
      UsuarioId,
      LivroId,
      dataEmprestimo,
      dataDevolucao,
      status,
      Usuario_UsuarioId,
    });

    res.json(emprestimo);
  } catch (error) {
    console.error('Erro ao atualizar empréstimo:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmprestimo = async (req, res) => {
  try {
    const { emprestimoId } = req.params;

    const emprestimo = await Emprestimo.findByPk(emprestimoId);

    if (!emprestimo) {
      return res.status(404).json({ message: 'Empréstimo não encontrado' });
    }

    await emprestimo.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar empréstimo:', error);
    res.status(500).json({ error: error.message });
  }
};