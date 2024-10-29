import pool from '../config/connectDB.js';

let getUpcomingMovie = async (curr_time) => {
    try {
        const [rows, field] = await pool.execute(`select * from Movies where start_date>$1
                                                order by (movie_label=‘hot’) desc, start_date desc`
                                                , [curr_time]);

        //check whether rows is null or not
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting movie list:', error);
    }
}

export default getUpcomingMovie;