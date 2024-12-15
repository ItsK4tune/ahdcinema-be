import db from '../config/connectDB.js';

export const getMovieContent = async (movie_id) => {
    try {
        const result = await db.query(`select * from Movies where movie_id= $1`
                                                , [movie_id]);
        return result.rows.length ? result.rows[0] : null
    } 
    catch (error) {
        console.error('Error getting movie details: ', error);
    }
}