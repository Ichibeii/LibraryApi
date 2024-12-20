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
    const { nome, email, telefone } = req.body;

    // Verifica se o ID do usuário autenticado é o mesmo que o ID da requisição
    if (req.usuario.id_usuario !== parseInt(id_usuario)) {
      return res.status(403).json({ message: 'Você não tem permissão para atualizar esse usuário.' });
    }

    const usuario = await usuarios.findByPk(id_usuario);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    await usuario.update({ nome, email, telefone });

    res.json({ message: 'Usuário atualizado com sucesso', usuario });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: error.message });
  }
};

//Atualizar senha do usuário
exports.updateSenha = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { senhaAtual, novaSenha } = req.body;

    // Verifica se o ID do usuário autenticado é o mesmo que o ID da requisição
    if (req.usuario.id_usuario !== parseInt(id_usuario)) {
      return res.status(403).json({ message: 'Você não tem permissão para atualizar a senha deste usuário.' });
    }

    // Verifica se o usuário existe
    const usuario = await usuarios.findByPk(id_usuario);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Verifica se a senha atual fornecida é correta
    const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ message: 'Senha atual incorreta' });

    // Criptografa a nova senha
    const novaSenhaCriptografada = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha no banco de dados
    await usuario.update({ senha: novaSenhaCriptografada });

    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar a senha:', error);
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
