import express from 'express'
import passport from 'passport';
import configRouter from '../config/routerConfig.js';
import setSession from '../middleware/setSession.js'
import checkSession from '../middleware/checkSession.js';
import deleteSession from '../middleware/deleteSession.js';
import { DeleteUser, ForgotPassword, Login, Register } from '../controller/authentication.controller.js';

let authRouter = express.Router();

configRouter(authRouter);

//check (for test)
authRouter.get('/health-check', (req, res) => {
    res.status(200).json("Check!");
}) 

//set cookie (for test) 
authRouter.get('/set-cookie', (req, res) => {
    // Setting a cookie
    res.cookie('test', 'test-value', { 
        maxAge: 900000, // Cookie expiration time in milliseconds
        httpOnly: true, // Makes the cookie accessible only by the web server
        secure: true, // Ensures the cookie is sent over HTTPS
        sameSite: 'Strict' // Controls cookie sending in cross-site requests
    });
    return res.json('Cookie has been set!');
});

//check-session (for test)
authRouter.get('/check-session', checkSession)

//register 
authRouter.post('/register', Register)

//login 
authRouter.post('/login', Login, setSession)

//login by google, using OAuth
authRouter.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    })
);

//callback 
authRouter.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/auth", //sau này thay bằng trang chủ
    failureRedirect: "/login",
}));

//login by facebook, using OAuth
authRouter.get("/facebook", passport.authenticate("facebook", {
    scope: ["profile", "email"],
    })
);

//callback
authRouter.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/auth", //sau này thay bằng trang chủ
    failureRedirect: "/login",
}));

//delete API
authRouter.post('/delete', checkSession, DeleteUser)

//logout API
authRouter.get('/logout', checkSession, deleteSession)

//forgot password API
authRouter.post('/forgot-password', ForgotPassword);

export default authRouter;