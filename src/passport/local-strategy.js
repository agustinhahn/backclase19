import * as services from "../services/user.services.js"
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";


const strategyConfig = {
    //campo que vamos a utilizar para validacion
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}

//metodo DONE: la proporciona passport. indica el resultado del prceso de auth. para qeu siga o indique si fallo algo, si no hay error, va null en 1er parametro. 
//2do parametro usuario o false

//logica de registro
const signUp = async(req, email, password, done) => {
    try {
        const user = await services.getUserByEmail(email)
        if(user) return done(null, false)
        const newUser = await services.register(req.body)
        return done(null, newUser)
    } catch (error) {
        console.log(error)
        return done(null, false)
    }
}

//logica login
const login = async(req,email,password,done) => {
    try {
        const userLogin = await services.login({email, password})
        if(!userLogin) return done(null,false,{msg:"error autenticacion"})
            console.log(userLogin)
        return done(null, userLogin)
    } catch (error) {
        console.log(error)
        return done(error)
    }

}

//constructor

const signUpStrategy = new LocalStrategy(strategyConfig, signUp)
const loginStrategy = new LocalStrategy(strategyConfig, login)

//cuando se autentique correctmente, passport devuelve en la session la info del usuario (id)
//luego esto, se usa como middleware

passport.use('login', loginStrategy)
passport.use('register', signUpStrategy)


//req.session.passport.user = "id del usuario de mongo"

//recibe el usuario y se queda con el id
passport.serializeUser((user,done)=>{
    // console.log("hola vine a ver que pasa")
    // console.log(user)
    // console.log(user._id)
    done(null, user._id )
})


//busca el usuario por id y devuelve info
passport.deserializeUser(async(id,done)=>{
    const user = await services.getUserById(id)
    return done(null, user)
})
