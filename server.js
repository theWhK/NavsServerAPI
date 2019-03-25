import express from 'express';
import bodyParser from 'body-parser';

// Núcleo
const app = express();
let moongose = require('mongoose');

// Variáveis
let port = process.env.port || 3000;

// Conexão com o Mongo
moongose.connect('mongodb://navs5_db:27017/navs5');

// Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Importação das rotas
let indexRoute =    require("./src/routes/index-routes"),
    productRoute =  require("./src/routes/product-routes"),
    userRoute =     require("./src/routes/user-routes");

// Aplicação das rotas
app.use('/api', indexRoute);
app.use('/produtos', productRoute);
app.use('/users', userRoute);

// Listen
app.listen(port, () => {
    console.log('Server started succesfully');
});