import express from 'express';
import session from 'express-session';
import bodyParser from "body-parser";
import passport from "passport";
import {setupPassportSession, configFacebookPassport, configGooglePassport} from './config/passportConfig.js';
import authRouter from './route/authenApi.js';
import cinemaRouter from './route/cinemaAPI.js';
import env from "dotenv";
import cookieParser from 'cookie-parser';


env.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true })); // Parse dữ liệu ở dạng x-www-form-urlencoded
app.use(express.json()); // Parse dữ liệu ở dạng JSON
// Đảm bảo rằng cookie-parser được khai báo trước các route
app.use(cookieParser());
//setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*1000, 
            httpOnly: true,
            secure: false, // Tắt secure nếu dùng HTTP (localhost)
            sameSite: 'Strict',}
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