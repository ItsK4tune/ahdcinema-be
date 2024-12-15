import db from '../config/connectDB.js';

export const getCity = async () => {
    try {
        const result = await db.query('SELECT distinct city_name FROM City JOIN Cinemas ON City.city_id = Cinemas.city_id');
        return result.rows.length ? result.rows : null;
    } 
    catch (error) {
        console.error('Error getting city: ', error);
    }
}

export const getCinema = async (city_id) => {
    try {
        const result = await db.query('SELECT * FROM cinemas WHERE city_id = $1', [city_id]);
        return result.rows.length ? result.rows : null;
    } 
    catch (error) {
        console.error('Error getting cinema: ', error);
    }
}


export const getShowTime = async (cinema_id, show_date) => {
    const curr_time = new Date().toLocaleTimeString('en-GB');
    try {
        const result = await db.query(`select m.movie_id, movie_name, movie_image, movie_label, s.*
                                                from Showtimes s join Movies m on s.movie_id=m.movie_id
                                                where s.cinema_id= $1 and s.show_date= $2
                                                and s.show_time > $3
                                                order by m.movie_id, show_time`
                                                , [cinema_id, show_date, curr_time]);                                      
        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting showtimes: ', error);
    }
}