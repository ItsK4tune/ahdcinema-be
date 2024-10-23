import express from 'express'
import passport from 'passport';

import configRouter from '../config/routerConfig.js';

import Login from '../controller/login.js'
import Register from '../controller/register.js';
import deleteUser from '../controller/deleteUser.js';

import checkSession from '../middleware/checkSession.js';

let authRouter = express.Router();

configRouter(authRouter);

//check API
authRouter.get('/', (req, res) => {
    res.json("Check!");
}) 

//register API
authRouter.post('/register', Register)

//login API
authRouter.post('/login', Login, (req, res) =>{
    req.session.user = {username: req.body.Username, password: req.body.Password};
    res.json({ message: 'Set session'});
})

authRouter.get('/check-session', checkSession)

//login by google, using OAuth
authRouter.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    })
);

authRouter.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
}));

//login by facebook, using OAuth
authRouter.get("/facebook", passport.authenticate("facebook", {
    scope: ["profile", "email"],
    })
);

authRouter.get("/facebook/callback", passport.authenticate("facebook"));

//delete API
authRouter.post('/delete', deleteUser)

export default authRouter;