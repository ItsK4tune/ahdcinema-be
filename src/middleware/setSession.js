let setSession = (req, res) =>{
    req.session.user = {username: req.body.Username, password: req.body.Password};
    res.json({ message: 'Session set'});
}

export default setSession;