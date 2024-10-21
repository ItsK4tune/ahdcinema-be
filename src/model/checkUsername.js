import pool from '../config/connectDB.js';

let checkUsername = async (username) => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM user WHERE Username = ?', [username]);

        // Check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
    }
}

export default checkUsername;