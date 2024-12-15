import express from 'express'
import passport from 'passport';
import {setupPassportSession, configFacebookPassport, configGooglePassport} from '../config/passportConfig.js';
import configRouter from '../config/routerConfig.js';
import { checkSession }from '../middleware/checkSession.js';
import { deleteSession } from '../middleware/deleteSession.js';
import { changePassword, DeleteUser, ForgotPassword, Login, Register} from '../controller/authentication.controller.js';
import { setUserSession } from '../middleware/setSession.js';
import { setUserCookie } from '../middleware/setCookie.js';
import { GetUserAccount } from '../controller/main-page.controller.js';
let authRouter = express.Router();
configRouter(authRouter);

// Cấu hình Passport
setupPassportSession(passport); // Thiết lập serialize/deserialize
configGooglePassport(passport); // Cấu hình chiến lược Google
configFacebookPassport(passport); // Cấu hình chiến lược Facebook

//check (for test)
authRouter.get('/health-check', (req, res) => {
    res.status(200).json("Check!");
});



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
authRouter.get('/check-session', checkSession);

//register 
authRouter.post('/register', Register);

//login 
authRouter.post('/login', Login, setUserSession, setUserCookie, (req, res) => {
    res.status(200).json({ message: 'Login successful', user: req.user });
})

//login by google, using OAuth
authRouter.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    })
);

// Callback sau khi đăng nhập Google
authRouter.get(
    "/google/callback", 
    passport.authenticate("google", { failureRedirect: "http://localhost:3000/Login" }),
    setUserCookie, 
    (req, res) => {
        res.redirect("http://localhost:3000");
    }
);


//login by facebook, using OAuth
authRouter.get("/facebook", passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
    })
);

// Callback sau khi đăng nhập Facebook
authRouter.get(
    "/facebook/callback", 
    passport.authenticate("facebook", { failureRedirect: "http://localhost:3000/Login" }),
    setUserCookie, 
    (req, res) => {
        res.redirect("http://localhost:3000");
    }
);
// API call in header
authRouter.get('/header', checkSession, GetUserAccount)

//delete API
authRouter.post('/delete', checkSession, DeleteUser)

//logout API
authRouter.delete('/logout', checkSession, deleteSession)

//forgot password API
authRouter.post('/forgot-password', ForgotPassword);

//change password API
authRouter.post('/change-password', checkSession, changePassword);

export default authRouter;