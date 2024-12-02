import pool from '../config/connectDB.js';

export const getALl = async () => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM cinema WHERE cityid = ?', [city_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting cinema: ', error);
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

export const getCity = async () => {
    try {
        const [rows, field] = await pool.execute('SELECT distinct city_name FROM city JOIN cinema ON city.cityid = cinema.cityid');
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting city: ', error);
    }
}

export const getCurrentMovie = async () => {
    const curr_date = new Date().toISOString().split('T')[0];
    try {
        const [rows, field] = await pool.execute(`select * from Movies where start_date<=?
                                                order by (movie_label=‘hot’) desc, start_date desc`
                                                , [curr_date]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting now-showing movies: ', error);
    }
}

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

export const getUpcomingMovie = async () => {
    const curr_date = new Date().toISOString().split('T')[0];
    try {
        const [rows, field] = await pool.execute(`select * from Movies where start_date>?
                                                order by (movie_label=‘hot’) desc, start_date desc`
                                                , [curr_date]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting upcoming movies: ', error);
    }
}

export const getCardType = async () => {
    try {
        const [rows, field] = await pool.execute('select * from MemberCards');
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting card types: ', error);
    }
}

export const getUserMemberCard = async (user_id) => {
    try {
        const [rows, field] = await pool.execute(`select * from MemberCards join Memberships on Membercards.card_id=UserMemberships.card_id where user_id = ? and status= ‘Active’`, [user_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting user's card types: `, error);
    }
}

export const getCardInfo = async (card_type) => {
    try {
        const [rows, field] = await pool.execute(`select card_id, price, duration from Membercards where card_type = ?`, [card_type]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting card info: `, error);
    }
}