import UserDao from "../dao/mongodb/user.dao.js"
import { UserModel } from "../dao/mongodb/models/user.model.js"
import { createHash, isValidPassword } from "../utils.js";
const userDao = new UserDao(UserModel);

export const login = async (req, res) => {
    try {
        console.log("hola desde services")
        console.log(req.body)
        const { email, password } = req.body;
        const user = await userDao.login(email);
        if (!user) res.status(401).json({ msg: "autenticacion fallida" });
        //res.redirect('/error-login)
        if (isValidPassword(password, user)) {
            req.session.email = email;
            req.session.info = { loggedIn: true, contador: 0 };
            res.redirect("/profile");
        }
        else {
            res.status(401).json({ msg: "autenticacion fallida" });
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            const user = await userDao.register({
                ...req.body,
                password: createHash(password),
                role: "admin",
            });
            if (!user) res.status(401).json({ msg: "user exist!" });
            else res.redirect("/login");
        }
        else {
            const user = await userDao.register({
                ...req.body,
                password: createHash(password)
            });
            if (!user) res.status(401).json({ msg: "user exist!" });
            else res.redirect("/login");
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserById = async (id) => {
    try {
        return await userDao.getById(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserByEmail = async (email) => {
    try {
        return await userDao.getByEmail(email);
    } catch (error) {
        throw new Error(error);
    }
};


export const visit = (req, res) => {
    if (!req.session.info) {
        req.session.info = { loggedIn: true, contador: 0 };
    } else {
        req.session.info.contador++;
    }
    res.json({
        msg: `${req.session.email} ha visitado el sitio ${req.session.info.contador} veces`,
    });
};

export const infoSession = (req, res) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
};

export const logout = (req, res) => {
    req.session.destroy();
    res.send("session destroy");
};
