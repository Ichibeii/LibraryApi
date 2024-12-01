const emprestimos = require('../models/emprestimos');
const usuarios = require('../models/usuarios');
const livros = require('../models/livros');

// Obter todos os empréstimos
exports.getAllEmprestimos = async (req, res) => {
  try {
    const todosEmprestimos = await emprestimos.findAll({
      include: [
        { model: usuarios, attributes: ['nome', 'email'] }, // Inclui informações do usuário
        { model: livros, attributes: ['titulo', 'autor'] },  // Inclui informações do livro
      ],
    });
    res.json(todosEmprestimos);
  } catch (error) {
    console.error('Erro ao buscar empréstimos:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obter empréstimo por ID
exports.getEmprestimoById = async (req, res) => {
  try {
    const { id_emprestimo } = req.params;
    const emprestimo = await emprestimos.findByPk(id_emprestimo, {
      include: [
        { model: usuarios, attributes: ['nome', 'email'] },
        { model: livros, attributes: ['titulo', 'autor'] },
      ],
    });
    if (!emprestimo) return res.status(404).json({ message: 'Empréstimo não encontrado' });
    res.json(emprestimo);
  } catch (error) {
    console.error('Erro ao buscar empréstimo:', error);
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo empréstimo
exports.createEmprestimo = async (req, res) => {
  try {
    const { id_usuario, id_livro, data_devolucao } = req.body;
    const novoEmprestimo = await emprestimos.create({
      id_usuario,
      id_livro,
      data_devolucao,
      devolvido: false,
    });
    res.status(201).json(novoEmprestimo);
  } catch (error) {
    console.error('Erro ao criar empréstimo:', error);
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um empréstimo
exports.updateEmprestimo = async (req, res) => {
  try {
    const { id_emprestimo } = req.params;
    const { data_devolucao, devolvido } = req.body;

    const emprestimo = await emprestimos.findByPk(id_emprestimo);
    if (!emprestimo) return res.status(404).json({ message: 'Empréstimo não encontrado' });

    await emprestimo.update({ data_devolucao, devolvido });
    res.json(emprestimo);
  } catch (error) {
    console.error('Erro ao atualizar empréstimo:', error);
    res.status(500).json({ error: error.message });
  }
};

// Deletar um empréstimo
exports.deleteEmprestimo = async (req, res) => {
  try {
    const { id_emprestimo } = req.params;

    const emprestimo = await emprestimos.findByPk(id_emprestimo);
    if (!emprestimo) return res.status(404).json({ message: 'Empréstimo não encontrado' });

    await emprestimo.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar empréstimo:', error);
    res.status(500).json({ error: error.message });
  }
};
