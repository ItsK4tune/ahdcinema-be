import express from 'express'
import passport from 'passport';

let oauthRouter = express.Router();

//login by google, using OAuth
oauthRouter.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    })
);

oauthRouter.get("/google/callback", passport.authenticate("google"));

//login by facebook, using OAuth
oauthRouter.get("/facebook", passport.authenticate("facebook", {
    scope: ["profile", "email"],
    })
);

oauthRouter.get("/facebook/callback", passport.authenticate("facebook"));


export default oauthRouter;