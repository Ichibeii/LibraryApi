const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');

const Emprestimo = sequelize.define('Emprestimo', {
  EmprestimoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  UsuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  LivroId: {
    type: DataTypes.INTEGER,
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
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Usuario_UsuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Emprestimo',
  timestamps: false,
});

Emprestimo.belongsTo(Usuario, { foreignKey: 'Usuario_UsuarioId' });

module.exports = Emprestimo;
