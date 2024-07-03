import UserDao from "../dao/mongodb/user.dao.js"
import { UserModel } from "../dao/mongodb/models/user.model.js"
import { createHash, isValidPassword } from "../utils.js";
const userDao = new UserDao(UserModel);

export const login = async (user) => {
    try {
        const { email, password } = user;
        const userExist = await getUserByEmail(email);
        if (!userExist) return null;
        const passValid = isValidPassword(password, userExist);
        if (!passValid) return null;
        return userExist;
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (user) => {
    try {
        const { email, password } = user;
        const existUser = await getUserByEmail(email);
        if (!existUser) {
            if (email === "adminCoder@coder.com" && password === "adminCoder123") {
                const newUser = await userDao.register({
                    ...user,
                    password: createHash(password),
                    role: "admin",
                });
                return newUser;
            } else {
                const newUser = await userDao.register({
                    ...user,
                    password: createHash(password),
                });
                return newUser;
            }
        } else return null;
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
