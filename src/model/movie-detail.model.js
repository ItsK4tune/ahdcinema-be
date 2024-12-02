import pool from '../config/connectDB.js';

export const getMovieContent = async (movie_id) => {
    try {
        const [rows, field] = await pool.execute(`select * from Movies where movie_id= ?`
                                                , [movie_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting movie details: ', error);
    }
}