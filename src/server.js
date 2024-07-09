import { initMongoDB } from './dao/mongodb/connection.js';
import express from 'express';
import morgan from 'morgan'
import {errorHandler} from './middlewares/errorHandler.js';
import 'dotenv/config';
import { configureSocket} from './socketConfig.js';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js';
import chatRouter from './routes/chat.router.js';
import initialRouter from "./routes/views.router.js"
import userRouter from "./routes/user.router.js"
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { validateLogin } from './middlewares/validateLogin.js';
import passport from 'passport';
import "./passport/local-strategy.js"
import { isAuth } from './middlewares/isAuth.js';
import "./passport/github-strategy.js"


const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};


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
app.use(cookieParser());
app.use(session(storeConfig));

// antes de las rutas
app.use(passport.initialize())
app.use(passport.session())


app.use('/', express.static(__dirname + '/public'));
//morgan
app.use(morgan('dev'));

//Configurar rutas
app.use('/', initialRouter); //login , register y demas.
app.use('/users', userRouter);
app.use("/products", isAuth, productsRouter);
app.use("/carts",isAuth, cartsRouter);
app.use("/chat", chatRouter)

//middleware de manejo de errores
app.use(errorHandler);

//Inicializar MongoDB
if(process.env.PERSISTENCE === 'MONGO') initMongoDB();