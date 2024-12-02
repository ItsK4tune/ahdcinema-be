import pool from '../config/connectDB.js';

export const getShowDate = async (movie_id) => {
    try {
        const [rows, field] = await pool.execute(`select distinct show_date from Showtimes where movie_id = ?`, [movie_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting showdate: `, error);
    }
}

export const getMovieCity = async (movie_id, show_date) => {
    try {
        const [rows, field] = await pool.execute(`select c.city_id, c.city_name, COUNT(ci.cinema_id) as cinema_count 
                                                    from Showtimes s 
                                                    JOIN Cinemas ci ON s.cinema_id = ci.cinema_id 
                                                    JOIN City c ON ci.city_id = c.city_id
                                                    where s.movie_id = ? and s.show_date = ?
                                                    GROUP BY c.city_id, c.city_name ORDER BY cinema_count DESC`, [movie_id, show_date]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting city: `, error);
    }
}

export const getShowTime = async (movie_id, show_date, city_id) => {
    try {
        const [rows, field] = await pool.execute(`SELECT ci.*, sr.*, s.show_time, COUNT(s.show_time) OVER (PARTITION BY ci.cinema_id, s.movie_id) AS showtime_count FROM Showtimes s 
                                                    JOIN ScreeningRooms sr ON s.screeningroom_id = sr.screeningroom_id 
                                                    JOIN Cinemas ci ON sr.cinema_id = ci.cinema_id 
                                                    WHERE s.movie_id = ? AND s.show_date = ? AND ci.city_id = ?
                                                    ORDER BY showtime_count DESC, ci.cinema_name, s.show_time`, [movie_id, show_date, city_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting showdtime: `, error);
    }
}

export const chooseSeat = async (screeningroom_id) => {
    try {
        const [rows, field] = await pool.execute(`select * from Seats join SeatType 
                                                    on Seats.seat_type_id = SeatType.seat_type_id
                                                    where screeningroom_id = ?`, [screeningroom_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error choosing seat: `, error);
    }
}

export const getVoucher = async () => {
    try {
        const [rows, field] = await pool.execute(`select * from Vouchers`);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error get voucher: `, error);
    }
}