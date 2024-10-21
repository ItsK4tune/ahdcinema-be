import pool from '../config/connectDB.js';

let checkUserExist = async (username, password) => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM user WHERE Username = ? and Password = ?', [username, password]);

        // Check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user:', error);
    }
}

export default checkUserExist;