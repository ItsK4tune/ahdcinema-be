// export const checkSession = (req, res, next) => {
//     if (req.session.passport || req.session.user) {
//       next();
//     } 
//     else {
//       res.status(401).json({active: false, message: 'Needed to be logged in first'});
//     }
// }
// export const checkSession = (req, res, next) => {
//   const passportUser = req.session.passport?.user; // Passport stores user here
//   const sessionUser = req.session.user; // Custom user session
//   if (passportUser || sessionUser) {
//     next(); // Session hợp lệ
//   } else {
//       console.warn("Session invalid or missing:", req.session); // Log lỗi chi tiết
//       res.status(401).json({ active: false, message: 'You must log in first' });
//   }
// };
export const checkSession = (req, res, next) => {
  console.log('Passport User:', req.session.passport?.user); // Kiểm tra passport session
  console.log('Custom User Session:', req.session.user); // Kiểm tra custom session

  const passportUser = req.session.passport?.user; // Passport stores user here
  const sessionUser = req.session.user; // Custom user session

  if (passportUser || sessionUser) {
    console.log('Session valid');
    next(); // Session hợp lệ
  } else {
    console.warn("Session invalid or missing:", req.session); // Log lỗi chi tiết
    res.status(401).json({ active: false, message: 'You must log in first' });
  }
};
