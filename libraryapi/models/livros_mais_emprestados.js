const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const livros_mais_emprestados = sequelize.define('livros_mais_emprestados', {
  id_livro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  total_emprestimos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'livros_mais_emprestados',
  timestamps: false,
});

module.exports = livros_mais_emprestados;
