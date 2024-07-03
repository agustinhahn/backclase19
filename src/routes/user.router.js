import { Router } from "express";
const router = Router();
import {
    logout,
    visit,
    infoSession,
} from "../services/user.services.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import {
    loginResponse, registerResponse
} from "../controllers/user.controller.js"
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { checkAuth } from "../middlewares/jwt.js";

router.post("/login", passport.authenticate('login'), loginResponse);
router.post('/register', passport.authenticate('register'), registerResponse)
router.get("/info", validateLogin, infoSession);
router.get("/secret-endpoint", validateLogin, visit);
// router.post("/logout", logout);
router.get('/private', checkAuth, (req, res)=>res.json({ user: req.user }));

export default router;
