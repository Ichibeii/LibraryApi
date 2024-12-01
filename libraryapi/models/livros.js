const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const livros = sequelize.define('livros', {
  id_livro: {
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
  },
  ano_publicacao: {
    type: DataTypes.INTEGER,
  },
  quantidade_total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade_disponivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'livros',
  timestamps: false,
});

module.exports = livros;
