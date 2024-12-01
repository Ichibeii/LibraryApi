const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const usuarios = sequelize.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = usuarios;
