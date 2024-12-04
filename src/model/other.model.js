import pool from '../config/connectDB.js';

export const getALl = async () => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM cinema WHERE cityid = ?', [city_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting cinema: ', error);
    }
}







