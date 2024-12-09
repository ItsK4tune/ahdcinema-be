import db from '../config/connectDB.js';

export const getALl = async () => {
    try {
        const [rows, field] = await db.query('SELECT * FROM cinema WHERE cityid = $1', [city_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting cinema: ', error);
    }
}







