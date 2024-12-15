import express from 'express';
import configRouter from '../config/routerConfig.js';
import { checkSession, checkAdminSession } from '../middleware/checkSession.js';
import { AdminLogin, AdminRegister, ChangePassword, DeleteAdmin, ForgotPassword } from '../controller/admin.controller.js';
import { AddCinema, AddMovie, AddScreeningRoom, AddSeat, AddShowTime, AddVoucher, DeleteUser } from '../controller/adminCRUD.controller.js';
import { deleteSession } from '../middleware/deleteSession.js';
import { setAdminSession } from '../middleware/setSession.js';
import { setAdminCookie } from '../middleware/setCookie.js';

let adminRouter = express.Router();
configRouter(adminRouter);

//check (for test)
adminRouter.get('/health-check', (req, res) => {
    res.status(200).json("Check!");
}) 

//check-session (for test)
adminRouter.get('/check-session', checkSession);

//login 
adminRouter.post('/login', AdminLogin, setAdminSession, setAdminCookie);

//register 
adminRouter.post('/register', AdminRegister);

//delete API
adminRouter.post('/delete', checkSession, checkAdminSession, DeleteAdmin);

//logout API
adminRouter.get('/logout', checkSession, checkAdminSession, deleteSession);

//change password API
adminRouter.post('/change-password', checkSession, ChangePassword);

//forgot password API
adminRouter.post('/forgot-password', ForgotPassword);

//delete user
adminRouter.post('/delete-user', checkSession, checkAdminSession, DeleteUser);

//add movie
adminRouter.post('/add-movie', checkSession, checkAdminSession, AddMovie);

//add cinema
adminRouter.post('/add-cinema', checkSession, checkAdminSession, AddCinema);

//add screening room
adminRouter.post('/add-screeningroom', checkSession, checkAdminSession, AddScreeningRoom);

//add show time
adminRouter.post('/add-showtime', checkSession, checkAdminSession, AddShowTime);

//add seat
adminRouter.post('/add-seat', checkSession, checkAdminSession, AddSeat);

//add voucher
adminRouter.post('/add-screeningroom', checkSession, checkAdminSession, AddVoucher);

export default adminRouter;

