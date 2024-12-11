import express from 'express';
import configRouter from '../config/routerConfig.js';
import { checkSession } from '../middleware/checkSession.js';
import { AdminLogin, AdminRegister, ChangePassword, DeleteAdmin, ForgotPassword } from '../controller/admin.controller.js';
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
adminRouter.post('/delete', checkSession, DeleteAdmin);

//logout API
adminRouter.get('/logout', checkSession, deleteSession);

//change password API
adminRouter.post('/change-password', checkSession, ChangePassword);

//forgot password API
adminRouter.post('/forgot-password', ForgotPassword);

export default adminRouter;

