export const setSession = (req, res, next) =>{
    req.session.user = {username: req.body.Username, password: req.body.Password};
    next();
}

