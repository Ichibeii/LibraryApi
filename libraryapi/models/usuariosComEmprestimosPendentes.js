const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsuariosComEmprestimosPendentes = sequelize.define('UsuariosComEmprestimosPendentes', {
  UsuarioEmprestimoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LivroId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataEmprestimo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dataDevolucao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'UsuariosComEmprestimosPendentes',
  timestamps: false,
});

module.exports = UsuariosComEmprestimosPendentes;
