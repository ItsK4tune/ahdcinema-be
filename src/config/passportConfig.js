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
                
                let user;
                if (!result) {
                    await pool.execute('INSERT INTO user (Username, Password) VALUES (?, ?)', [profile.email, "google"]);
                    user = {
                        Username: profile.email,
                        Password: "google"
                    }
                    return cb(null, user);
                } 
                else{
                    user = {
                        Username: result.Username,
                        Password: result.Password
                    }
                    return cb(null, user);
                }
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