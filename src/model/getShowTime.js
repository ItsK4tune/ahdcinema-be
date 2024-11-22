import pool from '../config/connectDB.js';

let getShowTime = async (cinema_id, show_date) => {
    const curr_time = new Date().toLocaleTimeString('en-GB');
    try {
        const [rows, field] = await pool.execute(`select movie_name, movie_image, movie_label, Showtimes.*
                                                from Showtimes s join Movies m on s.movie_id=m.movie_id
                                                where s.cinema_id= ? and s.show_date= ?
                                                and s.show_time > ?
                                                order by movie_id, show_time`
                                                , [cinema_id, show_date, curr_time]);

        //check whether rows is null or not
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting showtimes:', error);
    }
}

export default getShowTime;