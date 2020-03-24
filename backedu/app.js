
'use strict'
var createError = require('http-errors');
var express = require('express'),
    http = require('http'),
    https = require('https');
let bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');


// Rutas
let apiAdministrador = require('./routes/administrador.route');
let apiCategoriaCurso = require('./routes/categoriaCurso.route');
let apiSubCategoriaCurso = require('./routes/subCategoriacurso.route');
let apiRequisitoCurso = require('./routes/requisitoCurso.route');
let apiCurso = require('./routes/curso.route');
let apiModulo = require('./routes/modulo.route');
let apiTema = require('./routes/tema.route');
let apiContenido = require('./routes/contenido.route');
let apiExamen = require('./routes/examen.route');
let apiPerfiles = require('./routes/perfiles.route');
let apiEspecialidad = require('./routes/especialidad.route');
let apiPersona = require('./routes/persona.route');
let apiUsuario = require('./routes/usuario.route');
let apiEvalCurso = require('./routes/evaluacion.curso.route')
let apiChat = require ('./routes/chat.route')
let apieventos = require('./routes/eventos.route')
let apiGrupo = require('./routes/grupo.route')
let apiBanner = require('./routes/banner.route')

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({limit: '200mb'}));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Request-Method, enctype, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Allow', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

	next();
});

app.use('/api',apiAdministrador);
app.use('/api',apiCategoriaCurso);
app.use('/api',apiSubCategoriaCurso);
app.use('/api',apiRequisitoCurso);
app.use('/api',apiCurso);
app.use('/api',apiModulo);
app.use('/api',apiTema);
app.use('/api',apiContenido);
app.use('/api',apiExamen);
app.use('/api',apiPerfiles);
app.use('/api',apiEspecialidad);
app.use('/api',apiPersona);
app.use('/api',apiUsuario);
app.use('/api',apiEvalCurso);
app.use('/api', apiChat);
app.use('/api', apieventos);
app.use('/api', apiGrupo);
app.use('/api', apiBanner);

var mysql = require("mysql");
const port = 8081;
const secureport = 8443;

var secureServer = https.createServer({
    key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen(secureport, function() {
    console.log('API Server Started On Port %d', secureport);
});
// This line is from the Node.js HTTPS documentation.
// var options = {
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// };
// Create an HTTP service.
http.createServer(app).listen(port);
// Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(8443, () => {
//      console.log(`Server running on port: 8443`);
//  });

// app.listen(port, () => {
//     console.log(`Server running on port: ${port}`);
// });
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

module.exports = app;