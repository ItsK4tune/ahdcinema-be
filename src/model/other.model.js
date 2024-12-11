import db from '../config/connectDB.js';

export const getALl = async () => {
    try {
        const result = await db.query('SELECT * FROM cinemas WHERE city_id = $1', [city_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting cinema: ', error);
    }
}







