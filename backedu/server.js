'use strict'

let app = require('./app');
let port = 8081;

app.listen(port, function(){
	console.log(`Aplicacion de educacion funcionando en el puerto ${port}`);
});