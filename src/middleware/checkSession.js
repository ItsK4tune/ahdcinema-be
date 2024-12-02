let checkSession = (req, res, next) => {
    if (req.session.passport || req.session.user) {
        res.json({active: true}); //session is active
        next();
    } 
    else {
      res.status(401).json({active: false, message: 'Needed to be logged in first'});
    }
}

export default checkSession;