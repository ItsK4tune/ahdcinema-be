// export const checkSession = (req, res, next) => {
//     if (req.session.passport || req.session.user) {
//       next();
//     } 
//     else {
//       res.status(401).json({active: false, message: 'Needed to be logged in first'});
//     }
// }
export const checkSession = (req, res, next) => {
  const passportUser = req.session.passport?.user;
  const sessionUser = req.session.user; 

  if (passportUser || sessionUser) {
      next(); 
  } else {
      console.warn("Session invalid or missing:", req.session);
      res.status(401).json({ active: false, message: 'You must log in first' });
  }
};