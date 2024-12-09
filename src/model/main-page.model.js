import db from '../config/connectDB.js';

export const getMovie = async () => {
    try {
        const [rows, field] = await db.query(`select * from Movies where movie_label= 'hot'`);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting movie: ', error);
    }
}

export const getPoster = async () => {
    try {
        const [rows, field] = await db.query(`select * from Posters`);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting poster: ', error);
    }
}

export const getUserInfo = async () => {
    try {
        const [rows, field] = await db.query(`select * from Users where user_id = $1`, [user_id]);
        return rows.length ? rows : [];
    } 
    catch (error) {
        console.error('Error getting fullname: ', error);
    }
}