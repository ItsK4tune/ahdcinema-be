import pool from '../config/connectDB.js';

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