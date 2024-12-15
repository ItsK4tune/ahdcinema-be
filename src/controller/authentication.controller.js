import { createUser, deleteUser, getUserExist, checkEmail, setNewPassword, getOldPassword, updateNewPassword, getCurrentLogBy } from '../model/authentication.model.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export const Login = async (req, res, next) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        console.log('Login failed: Missing username or password');
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await getUserExist(Username);
        if (!user) {
            console.log('Login failed: User not found');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordMatch = await bcrypt.compare(Password, user.user_password);
        if (!isPasswordMatch) {
            console.log('Login failed: Incorrect password');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log('Login successful');
        req.user = { username: user.user_account, email: user.email};
        next(); // Chuyển tiếp đến middleware tiếp theo
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const Register = async (req, res) => {
    const { Username, Password, Email, Fullname, Phonenumber } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!Username || !Password || !Email || !Fullname || !Phonenumber) {
        console.log('Register failed: Missing some fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Kiểm tra định dạng email
    if (!validator.isEmail(Email)) {
        console.log('Register failed: Invalid email format');
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Kiểm tra độ dài mật khẩu
    if (Password.length < 6) {
        console.log('Register failed: Password too short');
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    try {
        // Kiểm tra username đã tồn tại
        const user = await getUserExist(Username);
        if (user) {
            console.log('Register failed: Username is already taken');
            return res.status(409).json({ message: `Username: ${Username} is already taken` }); // 409 Conflict
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Tạo tài khoản người dùng
        await createUser(Username, hashedPassword, Email, Fullname, Phonenumber);

        console.log(`Register successful for Username: ${Username}`);
        return res.status(201).json({ message: 'Registration successful' }); // 201 Created
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

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
};

export const ForgotPassword = async (req, res) => {
    const {Email} = req.body;

    if (!Email) {
        console.log('Cannot process: Missing Email');
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await checkEmail(Email, 'local');
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

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // 1. Kiểm tra yêu cầu có đầy đủ thông tin không
    if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // 2. Kiểm tra mật khẩu mới có khớp với xác nhận mật khẩu không
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: "New password and confirm password do not match." });
    }

    try {
        const userId = req.cookies.user_id.user_id
        const currentLogBy=await getCurrentLogBy(userId);
        // 3. Lấy thông tin user hiện tại từ session 
        if (currentLogBy !== 'local') {
            return res.status(400).json({ error: "Password change is not available for Google/Facebook accounts." });
        }
        
        // 4. Truy vấn mật khẩu hiện tại từ cơ sở dữ liệu
        const currentHashedPassword = await getOldPassword(userId);
        if (!currentHashedPassword) {
            return res.status(404).json({ error: "User not found." });
        }
        // 5. Kiểm tra mật khẩu cũ có đúng không
        const isMatch = await bcrypt.compare(oldPassword, currentHashedPassword);
        if (!isMatch) {
            return res.status(400).json({ error: "Old password is incorrect." });
        }

        // 6. Mã hóa mật khẩu mới
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // 7. Cập nhật mật khẩu mới vào cơ sở dữ liệu
        await updateNewPassword(hashedNewPassword, userId )
        // 8. Xóa phiên hiện tại và yêu cầu người dùng đăng nhập lại
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