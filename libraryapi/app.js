var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const usuariosRoutes = require('./routes/usuarios');
const livrosRoutes = require('./routes/livros');
const emprestimoRoutes = require('./routes/emprestimo');
const livrosMaisEmprestadosRoutes = require('./routes/livrosMaisEmprestados');
const usuariosComPendenciasRoutes = require('./routes/usuariosComPendencias');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', usuariosRoutes);
app.use('/livros', livrosRoutes);
app.use('/emprestimos', emprestimoRoutes);
app.use('/livros-mais-emprestados', livrosMaisEmprestadosRoutes);
app.use('/usuarios-com-pendencias', usuariosComPendenciasRoutes);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const sequelize = require('./config/database');
const Usuario = require('./models/usuarios');
const Emprestimo = require('./models/emprestimos');
const Livro = require('./models/livros');
const UsuariosComEmprestimosPendentes = require('./models/usuarios_com_pendencias');
const LivrosMaisEmprestados = require('./models/livros_mais_emprestados');

sequelize.sync({ force: false })
  .then(() => {
    console.log('Modelos sincronizados com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar os modelos:', err);
  });

module.exports = app;
