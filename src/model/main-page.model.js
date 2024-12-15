import db from '../config/connectDB.js';

export const getHotMovie = async () => {
    try {
        const result = await db.query(`select * from Movies where movie_label= 'hot'`);
        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting movie: ', error);
    }
}

export const getPoster = async () => {
    try {
        const result = await db.query(`select * from Posters`);
        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting poster: ', error);
    }
}

export const getUserAccount = async (user_id) => {
    try {
        const result= await db.query(`select user_account from Users where user_id = $1`, [user_id]);
        return result.rows.length ? result.rows[0] : []
    } 
    catch (error) {
        console.error('Error getting fullname: ', error);
    }
}