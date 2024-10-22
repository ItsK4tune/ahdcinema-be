let checkSession = (req, res) => {
    if (req.session.user) {
        res.json({ active: 'true' }); // Session is active
    } 
    else {
      res.status(401).json({ active: false, message: 'Session expired' });
    }
}

export default checkSession