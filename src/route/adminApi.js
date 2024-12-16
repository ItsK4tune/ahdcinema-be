import express from 'express';
import configRouter from '../config/routerConfig.js';
import { checkSession, checkAdminSession } from '../middleware/checkSession.js';
import { AdminLogin, AdminRegister, ChangePassword, DeleteAdmin, ForgotPassword } from '../controller/admin.controller.js';
import { AddCinema, GetCinema, UpdateCinema, DeleteCinema, AddMovie, GetMovie, UpdateMovie, DeleteMovie,
    AddScreeningRoom, GetScreeningroom, UpdateScreeningroom, DeleteScreeningroom, AddSeat, GetSeat, 
    AddShowTime, GetShowTime, UpdateShowTime, DeleteShowTime, AddVoucher, GetVoucher, UpdateVoucher, DeleteVoucher, DeleteUser } from '../controller/adminCRUD.controller.js';
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
adminRouter.post('/change-password', checkSession, checkAdminSession, ChangePassword);

//forgot password API
adminRouter.post('/forgot-password', ForgotPassword);

//delete user
adminRouter.post('/delete-user', checkSession, checkAdminSession, DeleteUser);

//crud movie
adminRouter.post('/movie', checkSession, checkAdminSession, AddMovie);
adminRouter.get('/movie', checkSession, checkAdminSession, GetMovie);
adminRouter.put('/movie', checkSession, checkAdminSession, UpdateMovie);
adminRouter.delete('/movie', checkSession, checkAdminSession, DeleteMovie);
//crud cinema
adminRouter.post('/cinema', checkSession, checkAdminSession, AddCinema);
adminRouter.get('/cinema', checkSession, checkAdminSession, GetCinema);
adminRouter.put('/cinema', checkSession, checkAdminSession, UpdateCinema);
adminRouter.delete('/cinema', checkSession, checkAdminSession, DeleteCinema);
//crud screening room
adminRouter.post('/screeningroom', checkSession, checkAdminSession, AddScreeningRoom);
adminRouter.get('/screeningroom', checkSession, checkAdminSession, GetScreeningroom);
adminRouter.put('/screeningroom', checkSession, checkAdminSession, UpdateScreeningroom);
adminRouter.delete('/screeningroom', checkSession, checkAdminSession, DeleteScreeningroom);
//crud show time
adminRouter.post('/showtime', checkSession, checkAdminSession, AddShowTime);
adminRouter.get('/showtime', checkSession, checkAdminSession, GetShowTime);
adminRouter.put('/showtime', checkSession, checkAdminSession, UpdateShowTime);
adminRouter.delete('/showtime', checkSession, checkAdminSession, DeleteShowTime);
//crud seat
adminRouter.post('/seat', checkSession, checkAdminSession, AddSeat);
adminRouter.get('/seat', checkSession, checkAdminSession, GetSeat);
//crud voucher
adminRouter.post('/voucher', checkSession, checkAdminSession, AddVoucher);
adminRouter.get('/voucher', checkSession, checkAdminSession, GetVoucher);
adminRouter.put('/voucher', checkSession, checkAdminSession, UpdateVoucher);
adminRouter.delete('/voucher', checkSession, checkAdminSession, DeleteVoucher);
export default adminRouter;

