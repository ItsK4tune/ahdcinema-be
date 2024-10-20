import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import FacebookStrategy from "passport-facebook";
import session from "express-session";
import env from "dotenv";
import nodemailer from "nodemailer"

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

//setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//run session
app.use(passport.initialize());
app.use(passport.session());

//run database
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
//secret page
app.get("/secrets", async (req, res) => {
  if (req.isAuthenticated()) {
    const result=await db.query("select * from users where email=$1",[req.user.email]);
    const secret=result.rows[0].secret;
    if(secret){
      res.render("secrets.ejs",{
        secret: secret,
      });
    }else{
      res.render("secrets.ejs",{
        secret: "This is a default secret!",
      });
    }
  } else {
    res.redirect("/login");
  }
});


app.get("/submit",  (req, res)=> {
  if (req.isAuthenticated()) {
    res.render("submit.ejs");
  } else {
    res.redirect("/login");
  }
});
//login by google, using OAuth
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);
//login by facebook, using OAuth
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);

app.get(
  "/auth/facebook/secrets",
  passport.authenticate("facebook", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);


app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.redirect("/register");
      console.log("Failed! Username already exists");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("Success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});


app.post("/submit",async (req,res)=>{
  const userSecret=req.body.secret;
  // console.log(req.isAuthenticated());
  try {
    await db.query("update users set secret=$1 where email=$2",[userSecret,req.user.email]);
    if(userSecret){
      res.render("secrets.ejs",{
        secret: userSecret,
      })
    }else {
      res.render("secrets.ejs",{
        secret: "❤ Thao Linh Pham is my little angel ❤",
      })
    }
  } catch (error) {
    console.log(error);
  }
})

//run local-passport
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

//run google-passport
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
//run facebook-passport
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/secrets",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
async (accessToken, refreshToken, profile, cb) => {
  try {
    console.log(profile);
  
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      profile.displayName,
    ]);
    if (result.rows.length === 0) {
      const newUser = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [profile.displayName, "facebook"]
      );
      return cb(null, newUser.rows[0]);
    } else {
      return cb(null, result.rows[0]);
    }
  } catch (err) {
    return cb(err);
  }
}
));

//handle forgot password
app.post('/forgot-password', async (req, res) => {
  const email = req.body.email;
  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1 AND password!=$2",[email,"google"])
    if (result.rows.length===0) {
      return res.status(404).send('Email does not exist!');
    }else{

    const newPassword = Math.random().toString(36).slice(-8);
    bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
      } else {
        db.query(
          "UPDATE users SET password=$1 WHERE email=$2",
          [hash, email]
        );
      }
    });

    // send email with nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.MY_GOOGLE_ACCOUNT,    
        pass: process.env.MY_GOOGLE_PASSWORD    
      }
    });

    let mailOptions = {
      from: process.env.MY_GOOGLE_ACCOUNT,
      to: email,
      subject: 'Password Reset Request',
      text: `Your new password is: ${newPassword}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error sending!');
      }
      res.redirect("/login");
      console.log("New password sent!")
    });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error!');
  }
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
