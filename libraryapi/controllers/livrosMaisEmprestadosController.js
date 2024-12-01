const livrosMaisEmprestados = require('../models/livros_mais_emprestados');

// Obter todos os livros mais emprestados
exports.getLivrosMaisEmprestados = async (req, res) => {
  try {
    const livros = await livrosMaisEmprestados.findAll();
    res.json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros mais emprestados:', error);
    res.status(500).json({ error: error.message });
  }
};
