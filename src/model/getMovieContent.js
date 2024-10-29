import pool from '../config/connectDB.js';

let getMovieContent = async (movie_id) => {
    try {
        const [rows, field] = await pool.execute(`select * from Movies where movie_id= $1`
                                                , [movie_id]);

        //check whether rows is null or not
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting movie content:', error);
    }
}

export default getMovieContent;