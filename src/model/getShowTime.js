import pool from '../config/connectDB.js';

let getShowTime = async (cinema_id, show_date, curr_time) => {
    try {
        const [rows, field] = await pool.execute(`select movie_name, movie_image, movie_label, Showtimes.*
                                                from Showtimes s join Movies m on s.movie_id=m.movie_id
                                                where s.cinema_id= $1 and s.showdate= $2
                                                and s.show_time > $3
                                                order by movie_id, show_time`
                                                , [cinema_id, show_date, curr_time]);

        //check whether rows is null or not
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting showtime:', error);
    }
}

export default getShowTime;