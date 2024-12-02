import pool from '../config/connectDB.js';

export const getCity = async () => {
    try {
        const [rows, field] = await pool.execute('SELECT distinct city_name FROM city JOIN cinema ON city.cityid = cinema.cityid');
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting city: ', error);
    }
}

export const getCinema = async (city_id) => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM cinema WHERE cityid = ?', [city_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting cinema: ', error);
    }
}


export const getShowTime = async (cinema_id, show_date) => {
    const curr_time = new Date().toLocaleTimeString('en-GB');
    try {
        const [rows, field] = await pool.execute(`select movie_name, movie_image, movie_label, Showtimes.*
                                                from Showtimes s join Movies m on s.movie_id=m.movie_id
                                                where s.cinema_id= ? and s.show_date= ?
                                                and s.show_time > ?
                                                order by movie_id, show_time`
                                                , [cinema_id, show_date, curr_time]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting showtimes: ', error);
    }
}