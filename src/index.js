import express from 'express';
import session from 'express-session';
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import FacebookStrategy from "passport-facebook";

import authRouter from './route/authenApi.js';

const app = express();
const PORT = process.env.PORT || 3000;

//setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 30000}
}));

//run session
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },accessToken => {
    console.log(accessToken);
  }
))

//authen using platform's data
app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Khoi tao server tai http://localhost:${PORT}`);
})  