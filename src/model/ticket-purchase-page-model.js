import db from '../config/connectDB.js';

export const getShowDate = async (movie_id) => {
    try {
        const result = await db.query(`select distinct show_date from Showtimes where movie_id = $1`, [movie_id]);
        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error(`Error getting showdate: `, error);
    }
}

export const getMovieCity = async (movie_id, show_date) => {
    try {
        const result = await db.query(`select c.city_id, c.city_name, COUNT(ci.cinema_id) as cinema_count 
                                                    from Showtimes s 
                                                    JOIN Cinemas ci ON s.cinema_id = ci.cinema_id 
                                                    JOIN City c ON ci.city_id = c.city_id
                                                    where s.movie_id = $1 and s.show_date = $2
                                                    GROUP BY c.city_id, c.city_name ORDER BY cinema_count DESC`, [movie_id, show_date]);
        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error(`Error getting city: `, error);
    }
}

export const getShowTime = async (movie_id, show_date, city_id) => {
    try {
        const result = await db.query(`SELECT ci.*, sr.*, s.show_time, COUNT(s.show_time) OVER (PARTITION BY ci.cinema_id, s.movie_id) AS showtime_count FROM Showtimes s 
                                                    JOIN ScreeningRooms sr ON s.screeningroom_id = sr.screeningroom_id 
                                                    JOIN Cinemas ci ON sr.cinema_id = ci.cinema_id 
                                                    WHERE s.movie_id = $1 AND s.show_date = $2 AND ci.city_id = $3
                                                    ORDER BY showtime_count DESC, ci.cinema_name, s.show_time`, [movie_id, show_date, city_id]);
        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error(`Error getting showdtime: `, error);
    }
}

export const chooseSeat = async (screeningroom_id, show_date, show_time) => {
    try {
        const result = await db.query(`select * from Seats join SeatType on Seats.seat_type_id = SeatType.seat_type_id
                                                           join Screeningrooms on Screeningrooms.screeningroom_id=Seats.screeningroom_id
                                                           join Showtimes on Showtimes.screeningroom_id=Screeningrooms.screeningroom_id
                                                        where Screeningrooms.screeningroom_id = $1 and show_date=$2 and show_time=$3`, [screeningroom_id, show_date, show_time]);
        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error(`Error choosing seat: `, error);
    }
}

export const getVoucher = async () => {
    try {
        const result = await db.query(`select * from Vouchers`);
        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error(`Error getting voucher: `, error);
    }
}


export const payTicket = async (total_price, user_id, seat_id, showtime_id, voucher_id) => {
    try {
        const result = await db.query(`insert into Tickets(total_price, user_id, seat_id, showtime_id, voucher_id) values ($1, $2, $3, $4, $5) returning ticket_id`, [total_price, user_id, seat_id, showtime_id, voucher_id]);
        return result.rows.length ? result.rows[0] : null
    } 
    catch (error) {
        console.error(`Error getting ticket_id: `, error);
    }
}