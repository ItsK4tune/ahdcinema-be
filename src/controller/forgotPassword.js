import checkUsername from "../model/checkUsername.js";
import nodemailer from "nodemailer";

let forgotPassword = async (req, res) => {
    const {Username, Email} = req.body;

    try {
        const result = await checkUsername(Username);

        console.log(result.Password);

        if (result.length==0) {
            return res.status(404).json('Account does not exist!');
        }
  
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
            to: Email,
            subject: 'Password Reset Request',
            text: `Your password is: ${result.Password}`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json('Error sending!');
            }
            res.redirect("/");
            console.log("Password sent!")
        });
    }
        
    catch (err) {
        console.error(err);
        res.status(500).send('Error!');
    }
}

export default forgotPassword;