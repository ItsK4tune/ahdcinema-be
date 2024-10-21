import pool from '../config/connectDB.js';

let deleteUser = async (username, password) => {
    try {
        await pool.execute('DELETE FROM user WHERE Username = ? AND Password = ?', [username, password]);
    } 
    catch (error) {
        console.error('Error delete user:', error);
    }
}

export default deleteUser;