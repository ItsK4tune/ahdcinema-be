import pool from '../config/connectDB.js';

export const getMovie = async () => {
    try {
        const [rows, field] = await pool.execute(`select * from Movies where movie_label= 'hot'`);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting movie: ', error);
    }
}

export const getPoster = async () => {
    try {
        const [rows, field] = await pool.execute(`select * from Posters`);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting poster: ', error);
    }
}

export const getUserInfo = async () => {
    try {
        const [rows, field] = await pool.execute(`select fullname from UserInfo where user_id = ?`, [user_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting movie: ', error);
    }
}