import pool from '../config/connectDB.js';

let checkUserExist = async (username, password) => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM user WHERE username = ? and pass = ?', [username, password]);

        // Check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
    }
}

export default checkUserExist;