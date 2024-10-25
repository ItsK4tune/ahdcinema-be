import pool from '../config/connectDB.js';

let getCinema = async (city_id) => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM cinema WHERE cityid = ?', [city_id]);

        //check whether rows is null or not
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting cinema:', error);
    }
}

export default getCinema;