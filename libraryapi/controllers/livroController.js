const Livro = require('../models/livro');  // Importando o modelo 'Livro'

exports.getAllLivros = async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.json(livros);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getLivroById = async (req, res) => {
  try {
    const { livroId, emprestimoId, usuarioId } = req.params;

    const livro = await Livro.findOne({
      where: {
        LivroId: livroId,
        Emprestimo_EmprestimoId: emprestimoId,
        Emprestimo_Usuario_UsuarioId: usuarioId
      }
    });

    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.json(livro);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createLivro = async (req, res) => {
  try {
    const { LivroId, titulo, autor, genero, anoPublicacao, Emprestimo_EmprestimoId, Emprestimo_Usuario_UsuarioId } = req.body;

    // Criando o livro
    const novoLivro = await Livro.create({
      LivroId,  // Pode omitir se for autoIncrement
      titulo,
      autor,
      genero,
      anoPublicacao,
      Emprestimo_EmprestimoId,
      Emprestimo_Usuario_UsuarioId
    });

    res.status(201).json(novoLivro);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateLivro = async (req, res) => {
  try {
    const { livroId, emprestimoId, usuarioId } = req.params;
    const { titulo, autor, genero, anoPublicacao } = req.body;

    const livro = await Livro.findOne({
      where: {
        LivroId: livroId,
        Emprestimo_EmprestimoId: emprestimoId,
        Emprestimo_Usuario_UsuarioId: usuarioId
      }
    });

    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    await livro.update({
      titulo,
      autor,
      genero,
      anoPublicacao
    });

    res.json(livro);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLivro = async (req, res) => {
  try {
    const { livroId, emprestimoId, usuarioId } = req.params;

    const livro = await Livro.findOne({
      where: {
        LivroId: livroId,
        Emprestimo_EmprestimoId: emprestimoId,
        Emprestimo_Usuario_UsuarioId: usuarioId
      }
    });

    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    await livro.destroy();
    res.status(204).send();  // Livro deletado com sucesso
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(500).json({ error: error.message });
  }
};
