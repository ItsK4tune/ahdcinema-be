let checkSession = (req, res, next) => {
    if (req.session.passport || req.session.user) {
        res.json({active: true}); //session is active
        next();
    } 
    else {
      res.status(401).json({active: false});
    }
}

export default checkSession;