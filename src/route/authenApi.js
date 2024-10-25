import express from 'express'
import passport from 'passport';

import configRouter from '../config/routerConfig.js';

import Login from '../controller/login.js'
import Register from '../controller/register.js';
import deleteUser from '../controller/deleteUser.js';

import setSession from '../middleware/setSession.js';
import checkSession from '../middleware/checkSession.js';
import deleteSession from '../middleware/deleteSession.js';

let authRouter = express.Router();

configRouter(authRouter);

//check (for test)
authRouter.get('/', (req, res) => {
    res.json("Check!");
}) 

//test cookie API 
authRouter.get('/set-cookie', (req, res) => {
    // Setting a cookie
    res.cookie('test', 'test-value', { 
        maxAge: 900000, // Cookie expiration time in milliseconds
        httpOnly: true, // Makes the cookie accessible only by the web server
        secure: true, // Ensures the cookie is sent over HTTPS
        sameSite: 'Strict' // Controls cookie sending in cross-site requests
    });
    res.send('Cookie has been set!');
});

//register 
authRouter.post('/register', Register)

//login 
authRouter.post('/login', Login, setSession)

//check-session (for test)
authRouter.get('/check-session', checkSession)

//login by google, using OAuth
authRouter.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    })
);

//callback 
authRouter.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/auth",
    failureRedirect: "/login",
}));

//login by facebook, using OAuth
authRouter.get("/facebook", passport.authenticate("facebook", {
    scope: ["profile", "email"],
    })
);

//callback
authRouter.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/auth",
    failureRedirect: "/login",
}));

//delete API
authRouter.post('/delete', checkSession, deleteUser)

//logout API
authRouter.get('/logout', checkSession, deleteSession)

export default authRouter;