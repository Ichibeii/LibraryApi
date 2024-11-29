var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const livroRoutes = require('./routes/livros');
const usuarioRoutes = require('./routes/usuarios');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/livros', livroRoutes);
app.use('/usuarios', usuarioRoutes);
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
const Usuario = require('./models/usuario');
const Emprestimo = require('./models/emprestimo');
const Livro = require('./models/livro');
const UsuariosComEmprestimosPendentes = require('./models/usuariosComEmprestimosPendentes');
const LivrosMaisEmprestados = require('./models/livrosMaisEmprestados');

sequelize.sync({ force: false })
  .then(() => {
    console.log('Modelos sincronizados com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar os modelos:', err);
  });

module.exports = app;
