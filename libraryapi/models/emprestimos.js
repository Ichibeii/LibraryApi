const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const usuarios = require('./usuarios');
const livros = require('./livros');

const emprestimos = sequelize.define('emprestimos', {
  id_emprestimo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: usuarios,
      key: 'id_usuario',
    },
  },
  id_livro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: livros,
      key: 'id_livro',
    },
  },
  data_emprestimo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  data_devolucao: {
    type: DataTypes.DATE,
  },
  devolvido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'emprestimos',
  timestamps: false,
});

module.exports = emprestimos;
