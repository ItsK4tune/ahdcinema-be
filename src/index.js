import express from 'express';
import session from 'express-session';
import bodyParser from "body-parser";
import passport from "passport";
import {setupPassportSession, configFacebookPassport, configGooglePassport} from './config/passportConfig.js';
import authRouter from './route/authenApi.js';
import cinemaRouter from './route/cinemaAPI.js';
import adminRouter from './route/adminApi.js';
import env from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';

env.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true })); // Parse dữ liệu ở dạng x-www-form-urlencoded
app.use(express.json()); // Parse dữ liệu ở dạng JSON
// Cấu hình CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Domain cho phép
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Phương thức cho phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Header cho phép
    credentials: true // Cho phép gửi cookies
};

app.use(cors(corsOptions));
// Đảm bảo rằng cookie-parser được khai báo trước các route
app.use(cookieParser());
//setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000, 
            httpOnly: true,
            secure: false, // Tắt secure nếu dùng HTTP (localhost)
            sameSite: 'Lax',}
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

//theater api
app.use('/ahd', cinemaRouter);

//admin page
app.use('/admin', adminRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Khoi tao server tai http://localhost:${PORT}`);
})  