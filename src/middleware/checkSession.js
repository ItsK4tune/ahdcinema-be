export const checkSession = (req, res, next) => {
    if (req.session.passport || req.session.user) {
      next();
    } 
    else {
      res.status(401).json({active: false, message: 'Needed to be logged in first'});
    }
}