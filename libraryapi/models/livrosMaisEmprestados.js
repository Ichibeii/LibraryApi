const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UsuariosComEmprestimosPendentes = require('./usuariosComEmprestimosPendentes');

const LivrosMaisEmprestados = sequelize.define('LivrosMaisEmprestados', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalEmprestimos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UsuariosComEmprestimosPendentes_UsuarioEmprestimoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
}, {
  tableName: 'LivrosMaisEmprestados',
  timestamps: false,
});

LivrosMaisEmprestados.belongsTo(UsuariosComEmprestimosPendentes, {
  foreignKey: 'UsuariosComEmprestimosPendentes_UsuarioEmprestimoId',
});

module.exports = LivrosMaisEmprestados;
