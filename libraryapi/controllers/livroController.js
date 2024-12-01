const livros = require('../models/livros');

// Obter todos os livros
exports.getAllLivros = async (req, res) => {
  try {
    const todosLivros = await livros.findAll();
    res.json(todosLivros);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obter livro por ID
exports.getLivroById = async (req, res) => {
  try {
    const { id_livro } = req.params;
    const livro = await livros.findByPk(id_livro);
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(livro);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ error: error.message });
  }
};

// Criar um novo livro
exports.createLivro = async (req, res) => {
  try {
    const { titulo, autor, genero, ano_publicacao, quantidade_total, quantidade_disponivel } = req.body;
    const novoLivro = await livros.create({ titulo, autor, genero, ano_publicacao, quantidade_total, quantidade_disponivel });
    res.status(201).json(novoLivro);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um livro
exports.updateLivro = async (req, res) => {
  try {
    const { id_livro } = req.params;
    const { titulo, autor, genero, ano_publicacao, quantidade_total, quantidade_disponivel } = req.body;
    const livro = await livros.findByPk(id_livro);
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });

    await livro.update({ titulo, autor, genero, ano_publicacao, quantidade_total, quantidade_disponivel });
    res.json(livro);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).json({ error: error.message });
  }
};

// Deletar um livro
exports.deleteLivro = async (req, res) => {
  try {
    const { id_livro } = req.params;
    const livro = await livros.findByPk(id_livro);
    if (!livro) return res.status(404).json({ message: 'Livro não encontrado' });

    await livro.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(500).json({ error: error.message });
  }
};
