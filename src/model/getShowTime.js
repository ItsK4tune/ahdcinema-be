import pool from '../config/connectDB.js';

let getShowTime = async (cinema_id, show_date, curr_time) => {
    try {
        const [rows, field] = await pool.execute(`SELECT * FROM movie JOIN showtimes ON movie.movieid = showtimes.movieid WHERE cinemaid = ? AND CONCAT(showdate, ' ', showtime) > NOW()` , [cinema_id, show_date, curr_time]);

        //check whether rows is null or not
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting showtime:', error);
    }
}

export default getShowTime;