import { Router } from "express";
const router = Router();
import {
    logout,
    visit,
    infoSession,
} from "../services/user.services.js";
import {
    githubResponse,
    loginResponse, registerResponse
} from "../controllers/user.controller.js"
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

//registro - login en local
router.post("/login", passport.authenticate('login'), loginResponse);
router.post('/register', passport.authenticate('register'), registerResponse)

//registro - login con github
router.get("/register-github", passport.authenticate('github',{scope:['user:email']})) //endpoint que se dispara cuando el user ponga en iniciar sesion con github
router.get('/profile',passport.authenticate('github',{scope:['user:email']}), githubResponse)

router.get("/info", isAuth, infoSession);
router.get("/secret-endpoint", isAuth, visit);
router.post("/logout",isAuth, logout);

export default router;
