const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Livro = sequelize.define('Livro', {
  LivroId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anoPublicacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Emprestimo_EmprestimoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  Emprestimo_Usuario_UsuarioId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  }
}, {
  tableName: 'Livro',
  timestamps: false,
});

module.exports = Livro;
