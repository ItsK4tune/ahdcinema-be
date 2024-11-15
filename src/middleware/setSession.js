let setSession = (req, res, next) =>{
    req.session.user = {username: req.body.Username, password: req.body.Password};
    res.json({ message: 'Session set'});
    next();
}

export default setSession;