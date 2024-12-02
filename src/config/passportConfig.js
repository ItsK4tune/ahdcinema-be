import GoogleStrategy from "passport-google-oauth2";
import FacebookStrategy from "passport-facebook";
import db from './connectDB.js'
import { getUsername } from "../model/user.model.js";

let configPassport = (passport) =>{
    //google strategy config
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const result = await getUsername(profile.email);
                
                let user;
                if (!result) {
                    await db.query('INSERT INTO user (Username, Password) VALUES (?, ?)', [profile.email, "google"]);
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
    
    //setup session
    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((user, cb) => {
        cb(null, user);
    });  
}

export default configPassport;