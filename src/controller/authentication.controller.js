import { createUser, deleteUser, getUserExist, getUsername } from '../model/authentication.model.js';


export const Login = async (req, res, next) => {
    const {Username, Password} = req.body;

    if (!Username || !Password) {
        console.log('Login failed: Missing Username or Password');
        return res.status(400).json({ message: 'Username and Password are required' });
    }

    try {
        const user = await getUserExist(Username, Password);
        
        if (!user) {
            console.log('Login failed: Invalid credentials');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log('Login successful');
        res.status(200).json({ message: 'Login successful' });

        next();
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const Register = async (req, res) => {
    const {Username, Password} = req.body;

    if (!Username || !Password) {
        console.log('Register failed: Missing Username or Password');
        return res.status(400).json({ message: 'Username and Password are required' });
    }

    try {
        const user = await getUsername(Username);
        
        if (user) {
            console.log('Register failed: Username is already taken');
            return res.status(401).json({ message: `Username: ${Username} is already taken` });
        }

        await createUser(Username, Password);

        console.log(`Register successful for Username: ${Username}`);
        return res.status(200).json({ message: 'Registration successful' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const DeleteUser = async (req, res) => {
    const {Username, Password} = req.body;

    if (!Username || !Password) {
        console.log('Delete failed: Missing Username or Password');
        return res.status(400).json({ message: 'Username and Password are required' });
    }

    try {
        const user = await getUserExist(Username, Password);

        if (!user) {
            console.log(`Delete failed: No user found for Username: ${Username}`);
            return res.status(401).json({ message: 'User not found' });
        }

        await deleteUser(Username, Password);

        console.log(`User: ${Username} deleted successfully`);
        return res.status(200).json({ message: 'User deleted successfully' });
    } 
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const ForgotPassword = async (req, res) => {
    const {Username, Email} = req.body;

    if (!Username || !Password) {
        console.log('Cannot get information: Missing Username or Email');
        return res.status(400).json({ message: 'Username and Email are required' });
    }

    try {
        const result = await getUsername(Username);

        if (result.length==0) {
            console.log(`Retrive password failed: No account found for Username: ${Username}`);
            return res.status(401).json({ message: 'Retrive password failed: Account does not exist!' });
        }
  
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
                return res.status(500).json('Error sending mail');
            }
            console.log(`Send password-recovery mail successfully to User: ${Username}`);
            return res.status(200).json({ message: 'Send password-recovery mail successfully' });
        });
    }
    catch (error) {
        console.error(err);
        res.status(500).send('Error!');
    }
}