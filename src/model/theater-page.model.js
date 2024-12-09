import db from '../config/connectDB.js';

export const getCity = async () => {
    try {
        const [rows, field] = await db.query('SELECT distinct city_name FROM City JOIN Cinemas ON City.city_id = Cinemas.city_id');
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting city: ', error);
    }
}

export const getCinema = async (city_id) => {
    try {
        const [rows, field] = await db.query('SELECT * FROM Cinemas WHERE city_id = $1', [city_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting cinema: ', error);
    }
}


export const getShowTime = async (cinema_id, show_date) => {
    const curr_time = new Date().toLocaleTimeString('en-GB');
    try {
        const [rows, field] = await db.query(`select movie_id, movie_name, movie_image, movie_label, Showtimes.*
                                                from Showtimes s join Movies m on s.movie_id=m.movie_id
                                                where s.cinema_id= $1 and s.show_date= $2
                                                and s.show_time > $3
                                                order by movie_id, show_time`
                                                , [cinema_id, show_date, curr_time]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting showtimes: ', error);
    }
}