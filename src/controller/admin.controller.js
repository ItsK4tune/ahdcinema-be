import validator from 'validator';
import { checkEmail, createAdmin, deleteAdmin, getAdminExist, getOldPassword, setNewPassword } from '../model/admin.model.js';

export const AdminLogin = async (req, res) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        console.log('Login failed: Missing username or password');
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await getAdminExist(Username);
        if (!user) {
            console.log('Login failed: Admin not found');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordMatch = await bcrypt.compare(Password, user.user_password);
        if (!isPasswordMatch) {
            console.log('Login failed: Incorrect password');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log('Admin login successful');
        return res.status(200).json({ message: 'Login successful', admin: { username: admin.admin_account } });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const AdminRegister = async (req, res) => {
    const { Username, Password, Email, Fullname, Phonenumber } = req.body;

    if (!Username || !Password || !Email) {
        console.log('Register failed: Missing some fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validator.isEmail(Email)) {
        console.log('Register failed: Invalid email format');
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (Password.length < 6) {
        console.log('Register failed: Password too short');
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    try {
        const user = await getAdminExist(Username);
        if (user) {
            console.log('Register failed: Username is already taken');
            return res.status(409).json({ message: `Username: ${Username} is already taken` });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        await createAdmin(Username, hashedPassword, Email, Fullname, Phonenumber);

        console.log(`Register successful for Username: ${Username}`);
        return res.status(201).json({ message: 'Admin Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const DeleteAdmin = async (req, res) => {
    const {Username, Password} = req.body;

    if (!Username || !Password) {
        console.log('Delete failed: Missing Username or Password');
        return res.status(400).json({ message: 'Username and Password are required' });
    }

    try {
        const user = await getAdminExist(Username, Password);

        if (!user) {
            console.log(`Delete failed: No admin found for Username: ${Username}`);
            return res.status(401).json({ message: 'Admin not found' });
        }

        await deleteAdmin(Username, Password);

        console.log(`Admin: ${Username} deleted successfully`);
        return res.status(200).json({ message: 'Admin deleted successfully' });
    } 
    catch (error) {
        console.error('Error deleting admin:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const ChangePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: "All fields are required." });
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: "New password and confirm password do not match." });
    }

    try {
        const currentHashedPassword = await getOldPassword(adminId);

        if (!currentHashedPassword) {
            return res.status(404).json({ error: "Admin not found." });
        }

        const isMatch = await bcrypt.compare(oldPassword, currentHashedPassword);
        if (!isMatch) {
            return res.status(400).json({ error: "Old password is incorrect." });
        }

        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        await updateNewPassword(hashedNewPassword, admin_account);

        await req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).json({ error: "Failed to log out after password change." });
            }
            res.status(200).json({ message: "Password changed successfully. Please log in again." });
        });
    } catch (err) {
        console.error("Error changing password:", err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const ForgotPassword = async (req, res) => {
    const {Email} = req.body;

    if (!Email) {
        console.log('Cannot process: Missing Email');
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await checkEmail(Email);
        if (!user) {
            return res.status(404).json({ message: 'Email does not exist!' });
        }
        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await setNewPassword(hashedPassword, Email);

        const transporter = nodemailer.createTransport({
          service: 'gmail', 
          auth: {
            user: process.env.MY_GOOGLE_ACCOUNT,    
            pass: process.env.MY_GOOGLE_PASSWORD    
          }
        });
    
        const mailOptions = {
          from: process.env.MY_GOOGLE_ACCOUNT,
          to: Email,
          subject: 'Password Reset Request',
          text: `Your new password is: ${newPassword}. Please login with this password and change it if you want!`
        };

        await transporter.sendMail(mailOptions);
        console.log("New password sent!");
        return res.status(200).json({ message: 'Password reset successfully. Check your email!' });
    } catch (error) {
        console.error("Error during password reset:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};