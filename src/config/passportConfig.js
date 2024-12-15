import GoogleStrategy from "passport-google-oauth2";
import FacebookStrategy from "passport-facebook";
import { checkEmail, createOAuthAccount, getUserById } from "../model/authentication.model.js";
import env from "dotenv";

env.config();
export const configGooglePassport = (passport) =>{
    //google strategy config
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/auth/google/callback",
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                console.log(profile)
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
                callbackURL: "http://localhost:5000/auth/facebook/callback",
                profileFields: ['id', 'displayName', 'photos', 'email'], // Đảm bảo yêu cầu email
            },
            async (accessToken, refreshToken, profile, cb) => {
                try {
                    console.log(profile)
                    const result = await checkEmail(profile.emails[0].value, 'facebook'); // Kiểm tra xem email đã tồn tại chưa
                    if (!result) {
                        const newUser = await createOAuthAccount(profile.displayName, profile.emails[0].value, 'facebook'); 
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
// export const setupPassportSession = (passport) => {
//     passport.serializeUser((user, cb) => {
//         cb(null, user);
//     });

//     passport.deserializeUser((user, cb) => {
//         cb(null, user);
//     });
// };
export const setupPassportSession = (passport) => {
    passport.serializeUser((user, cb) => {
        cb(null, user.user_id); 
    });

    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await getUserById(id); 
            cb(null, user); 
        } catch (error) {
            cb(error, null); 
        }
    });
};
