const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const usuarios_com_pendencias = sequelize.define('usuarios_com_pendencias', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emprestimos_pendentes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'usuarios_com_pendencias',
  timestamps: false,
});

module.exports = usuarios_com_pendencias;
