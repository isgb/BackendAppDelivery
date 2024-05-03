const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan')
const cors = require('cors');
const passport = require('passport')

/**
 * IMPORTAR RUTAS
 */
const usersRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by')

app.set('port', port);

/**
 * LLAMADO DE LAS RUTAS
 */
usersRoutes(app)
//192.168.1.70 69
server.listen(3000, '192.168.1.68' || 'localhost', function() {
    console.log('Aplicación de NodeJS ' + port + " Iniciada...")
})

app.get('/', (req,res) => {
    res.send('Ruta raíz del backend');
});

app.get('/test', (req,res) => {
    res.send('Este es la ruta TEST');
});

//ERROR HANDLER
app.use((err, req,res,next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})

module.exports = {
    app: app,
    server: server
}

// 200 - ES UNA REPSUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR