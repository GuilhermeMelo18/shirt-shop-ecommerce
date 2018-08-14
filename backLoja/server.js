/**
 * Arquivo: server.js
 * Descrição: Arquivo responsável por levantar o serviço do Node.Js para poder
 * executar a aplicação e a API através do Express.Js.
 * Author: Guilherme Melo
 */
 
//Base do Setup da Aplicação:
 
/* Chamada das Packages que iremos precisar para a nossa aplicação */
var express     = require('express'); //chamando o pacote express
var app         = express(); //definção da nossa aplicação através do express
var bodyParser  = require('body-parser');  //chamando o pacote body-parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
 
/** Configuração da variável 'app' para usar o 'bodyParser()'.
 * Ao fazermos isso nos permitirá retornar os dados a partir de um POST
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
/** Definição da porta onde será executada a nossa aplicação */
var port = process.env.PORT || 8000; 
 
//Iniciando o Servidor (Aplicação):
//==============================================================
app.listen(port);
app.disable('x-powered-by');
console.log('Iniciando a aplicação na porta ' + port);



//Configuração Base da Aplicação:
//====================================================================================
var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost:27017/admin');
 
var Usuario = require('./app/models/usuario');

// Configuração dos Headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

/*Configuração Para Salvar Sessões do Usuário*/
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
 
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/admin',
  collection: 'lojaSessions'
});
 
app.use(require('express-session')({
  secret: '2ejlq32wlj23dqjledq',
  cookie: {
    maxAge: 60 * 60 * 1000  // 1 hour
  },
  store: store,
  resave: true,
  saveUninitialized: false
}));



//Rotas da nossa API:
//==============================================================
 
/* Configuração das Rotas do Express */
var router = express.Router();
 
/* Middleware para usar em todos os requests enviados para a nossa API- Mensagem Padrão */
router.use(function(req, res, next) {
    console.log('Request:');
    console.log(req.host);
    next(); //aqui é para sinalizar de que prosseguiremos para a próxima rota. E que não irá parar por aqui!!!
});

/* Todas as nossas rotas serão prefixadas com '/api' */
app.use('/api', router);
app.use('/api/users', require('./app/routers/usuario'));
app.use('/api/shirts', require('./app/routers/camisas'));
app.use('/api/purchases', require('./app/routers/purchase'));

