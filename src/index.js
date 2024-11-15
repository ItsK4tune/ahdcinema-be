import express from 'express';
import session from 'express-session';
import passport from "passport";

import configPassport from './config/passportConfig.js';

import authRouter from './route/authenAPI.js';
import cinemaRouter from './route/cinemaAPI.js';

const app = express();
const PORT = process.env.PORT || 3000;

//setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 300000}
}));

//run session
app.use(passport.initialize());
app.use(passport.session());

//passport config
configPassport(passport);

//authen using platform's data
app.use('/auth', authRouter);

//API
app.use('/api', cinemaRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Khoi tao server tai http://localhost:${PORT}`);
})  