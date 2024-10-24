let checkSession = (req, res) => {
    if (req.session.passport || req.session.user) {
        res.json({active: true}); //session is active
    } 
    else {
      res.status(401).json({active: false});
    }
}

export default checkSession