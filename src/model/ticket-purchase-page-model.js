import db from '../config/connectDB.js';

export const getShowDate = async (movie_id) => {
    try {
        const [rows, field] = await db.query(`select distinct show_date from Showtimes where movie_id = $1`, [movie_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting showdate: `, error);
    }
}

export const getMovieCity = async (movie_id, show_date) => {
    try {
        const [rows, field] = await db.query(`select c.city_id, c.city_name, COUNT(ci.cinema_id) as cinema_count 
                                                    from Showtimes s 
                                                    JOIN Cinemas ci ON s.cinema_id = ci.cinema_id 
                                                    JOIN City c ON ci.city_id = c.city_id
                                                    where s.movie_id = $1 and s.show_date = $2
                                                    GROUP BY c.city_id, c.city_name ORDER BY cinema_count DESC`, [movie_id, show_date]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting city: `, error);
    }
}

export const getShowTime = async (movie_id, show_date, city_id) => {
    try {
        const [rows, field] = await db.query(`SELECT ci.*, sr.*, s.show_time, COUNT(s.show_time) OVER (PARTITION BY ci.cinema_id, s.movie_id) AS showtime_count FROM Showtimes s 
                                                    JOIN ScreeningRooms sr ON s.screeningroom_id = sr.screeningroom_id 
                                                    JOIN Cinemas ci ON sr.cinema_id = ci.cinema_id 
                                                    WHERE s.movie_id = $1 AND s.show_date = $2 AND ci.city_id = $3
                                                    ORDER BY showtime_count DESC, ci.cinema_name, s.show_time`, [movie_id, show_date, city_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting showdtime: `, error);
    }
}

export const chooseSeat = async (screeningroom_id) => {
    try {
        const [rows, field] = await db.query(`select * from Seats join SeatType 
                                                    on Seats.seat_type_id = SeatType.seat_type_id
                                                    where screeningroom_id = $1`, [screeningroom_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error choosing seat: `, error);
    }
}

export const getVoucher = async (voucher_code) => {
    try {
        const [rows, field] = await db.query(`select * from Vouchers where voucher_code = $1`, [voucher_code]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting voucher: `, error);
    }
}

export const getUserMemberCard = async (user_id) => {
    try {
        const [rows, field] = await db.query(`select * from Membercards m join UserMemberships um on m.card_id = um.card_id where user_id = $1`, [user_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting membercard: `, error);
    }
}

export const payTicket = async (total_price, user_id, seat_id, showtime_id, voucher_id) => {
    try {
        const [rows, field] = await db.query(`insert into Tickets(total_price, user_id, seat_id, showtime_id, voucher_id) values ($1, $2, $3, $4, $5) returning ticket_id`, [total_price, user_id, seat_id, showtime_id, voucher_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting ticket_id: `, error);
    }
}