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

export const checkAdminSession = (req, res, next) => {
  const sessionAdmin = req.session.user.isAdmin; 

  if (sessionAdmin) {
      next(); 
  } else {
      console.warn("Session rejected:", req.session);
      res.status(401).json({ active: false, message: `No permission!` });
  }
};
