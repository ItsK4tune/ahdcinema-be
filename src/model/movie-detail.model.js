import db from '../config/connectDB.js';

export const getMovieContent = async (movie_id) => {
    try {
        const [rows, field] = await db.query(`select * from Movies where movie_id= $1`
                                                , [movie_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting movie details: ', error);
    }
}