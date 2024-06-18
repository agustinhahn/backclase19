import { Router } from "express";
import { validateLogin } from "../middlewares/validateLogin.js";

const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/profile", validateLogin, (req, res) => {
    res.render("profile");
});

export default router;
