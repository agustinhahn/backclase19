import { initMongoDB } from './dao/mongodb/connection.js';
import express from 'express';
import morgan from 'morgan'
import {errorHandler} from './middlewares/errorHandler.js';
import 'dotenv/config';
import { configureSocket} from './socketConfig.js';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js';
import chatRouter from './routes/chat.router.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';


//express
const app = express(); //app es igual a la ejecucion de express
const PORT = 8080;

//Configuracion de motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + '/views');

//crear servidor http
const httpServer = app.listen(PORT, () => { 
    console.log('listening on port ' + PORT)
});

//Socket.io
configureSocket(httpServer);

//Configuracion de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public'));
//morgan
app.use(morgan('dev'));

//Configurar rutas
app.use("/products", productsRouter);
app.use("/carts", cartsRouter);
app.use("/chat", chatRouter)

//middleware de manejo de errores
app.use(errorHandler);

//Inicializar MongoDB
if(process.env.PERSISTENCE === 'MONGO') initMongoDB();