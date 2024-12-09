import express from 'express';
import session from 'express-session';
import passport from "passport";
import {setupPassportSession, configFacebookPassport, configGooglePassport} from './config/passportConfig.js';
import authRouter from './route/authenApi.js';
import cinemaRouter from './route/cinemaAPI.js';
import env from "dotenv";

env.config();
const app = express();
const PORT = process.env.PORT || 5000;

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

// Cấu hình Passport
setupPassportSession(passport); // Thiết lập serialize/deserialize
configGooglePassport(passport); // Cấu hình chiến lược Google
configFacebookPassport(passport); // Cấu hình chiến lược Facebook

//authen using platform's data
app.use('/auth', authRouter);

//API
app.use('/api', cinemaRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Khoi tao server tai http://localhost:${PORT}`);
})  