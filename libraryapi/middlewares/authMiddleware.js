const jwt = require('jsonwebtoken');

// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Verificar se o usuário está autenticado
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  try {
    // Usando a chave secreta do arquivo .env
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Verificar se o usuário é administrador
exports.verifyAdmin = (req, res, next) => {
  if (req.usuario.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
  }
  next();
};
