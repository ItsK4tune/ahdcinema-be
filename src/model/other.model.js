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







export const getCardInfo = async (card_type) => {
    try {
        const [rows, field] = await pool.execute(`select card_id, price, duration from Membercards where card_type = ?`, [card_type]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting card info: `, error);
    }
}