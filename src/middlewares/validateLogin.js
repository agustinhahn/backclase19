export const validateLogin = (req, res, next) => {
    console.log(req.session);
    if (req.session.info && req.session.info.loggedIn) {
        next();
    } else {
        res.send('No estás autorizado');
    }
};