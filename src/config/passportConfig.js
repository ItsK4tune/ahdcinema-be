import GoogleStrategy from "passport-google-oauth2";
import FacebookStrategy from "passport-facebook";
import { checkEmail, createOAuthAccount } from "../model/authentication.model.js";
import env from "dotenv";

env.config();
export const configGooglePassport = (passport) =>{
    //google strategy config
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/cinema",
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const result = await checkEmail(profile.email, 'google');
                if (!result) {
                    const newUser = await createOAuthAccount(profile.name.givenName, profile.email, 'google'); 
                    return cb(null, newUser);
                } 
                else{
                    return cb(null, result);
                }
            } 
            catch (err) {
                console.error("Error in Google strategy:", err);
                return cb(err);
            }
    }));  
}
//run facebook-passport
export const configFacebookPassport = (passport) => {
    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: "http://localhost:3000/auth/facebook/cinema",
                profileFields: ['id', 'displayName', 'photos', 'email'], // Đảm bảo yêu cầu email
            },
            async (accessToken, refreshToken, profile, cb) => {
                try {
                    const result = await checkFacebookEmail(profile.email, 'facebook'); // Kiểm tra xem email đã tồn tại chưa
                    if (!result) {
                        const newUser = await createOAuthAccount(profile.displayName, profile.email, 'facebook'); 
                        return cb(null, newUser);
                    } else {
                        return cb(null, result);
                    }
                } catch (err) {
                    console.error("Error in Facebook strategy:", err);
                    return cb(err);
                }
            }
        )
    );
};
export const setupPassportSession = (passport) => {
    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((user, cb) => {
        cb(null, user);
    });
};