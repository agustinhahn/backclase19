export const validateLogin = (req, res, next) => {
    console.log("hola desde validateLogin")
    if (req.session.info && req.session.info.loggedIn) {
        next();
    } else {
        res.send('No estás autorizado');
        console.log("seguis en validate login")
    }
};