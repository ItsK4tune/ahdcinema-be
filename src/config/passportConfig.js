import GoogleStrategy from "passport-google-oauth2";
import FacebookStrategy from "passport-facebook";

import pool from './connectDB.js'

import checkUsername from '../model/checkUsername.js';

let configPassport = (passport) =>{
    passport.use(new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const result = await checkUsername(profile.email);
                
                if (!result) {
                    const newUser = await pool.execute('INSERT INTO user (Username, Password, GoogleOauth) VALUES (?, ?, ?)', [profile.email, "google", accessToken]);
                    return cb(null, newUser.rows[0]);
                } 
                else
                    return cb(null, result);
            } 
            catch (err) {
                return cb(err);
            }
    }));
    
    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((user, cb) => {
        cb(null, user);
    });  
}

export default configPassport;