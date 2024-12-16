import db from '../config/connectDB.js';

export const addMovie = async (movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link, description) => {
    try {
        await db.query(`insert into Movies (movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link, description) 
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, [movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link, description]);
    } 
    catch (error) {
        console.error('Error adding movie', error);
        throw error;
    }
};

export const addCinema = async (cinema_name, address, cinema_image, city_id) => {
    try {
        await db.query(`insert into Cinemas (cinema_name, address, cinema_image, city_id) 
            values ($1, $2, $3, $4)`, [cinema_name, address, cinema_image, city_id]);
    } 
    catch (error) {
        console.error('Error adding cinema', error);
        throw error;
    }
};

export const addScreeningRoom = async (room_number, room_type, seat_capacity, cinema_id) => {
    try {
        await db.query(`insert into ScreeningRooms (room_number, room_type, seat_capacity, cinema_id) 
            values ($1, $2, $3, $4)`, [room_number, room_type, seat_capacity, cinema_id]);
    } 
    catch (error) {
        console.error('Error adding screening room', error);
        throw error;
    }
};

export const addShowTime = async (show_date, show_time, movie_id, cinema_id, screeningroom_id) => {
    try {
        await db.query(`insert into Showtimes (show_date, show_time, movie_id, cinema_id, screeningroom_id) 
            values ($1, $2, $3, $4, $5, $6)`, [show_date, show_time, movie_id, cinema_id, screeningroom_id]);
    } 
    catch (error) {
        console.error('Error adding showtime', error);
        throw error;
    }
};

export const addSeat = async (seat_id, seat_number, is_available, seat_type_id, screeningroom_id) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        await client.query(`delete from Seats where screeningroom_id=$1`, [screeningroom_id]);
        await client.query(`insert into Seats (seat_id, seat_number, is_available, seat_type_id, screeningroom_id) 
            values ($1, $2, $3, $4, $5)`, [seat_id, seat_number, is_available, seat_type_id, screeningroom_id]);
        await client.query("COMMIT");
        console.log("Add seats successfully");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Add seats failed:", error);
    } finally {
        client.release();
    }
};

export const addVoucher = async (voucher_name, voucher_code, expiry_date, voucher_value) => {
    try {
        await db.query(`insert into Vouchers (voucher_name, voucher_code, expiry_date, voucher_value) 
            values ($1, $2, $3, $4, $5)`, [voucher_name, voucher_code, expiry_date, voucher_value]);
    } 
    catch (error) {
        console.error('Error adding voucher', error);
        throw error;
    }
};
export const getMovie = async () => {
    try {
        const result = await db.query('SELECT * FROM Movies');

        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const getCinema = async () => {
    try {
        const result = await db.query('SELECT * FROM Cinemas JOIN City on Cinemas.city_id=City.city_id');

        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const getScreeningroom = async (cinemaId) => {
    try {
        const result = await db.query('SELECT * FROM Screeningrooms JOIN Cinemas ON Screeningrooms.cinema_id=Cinemas.cinema_id WHERE Cinemas.cinema_id = $1', [cinemaId]);

        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const getShowtime = async () => {
    try {
        const result = await db.query(`SELECT * FROM Showtimes JOIN Movies on Showtimes.movie_id=Movies.movie_id JOIN Cinemas on Cinemas.cinema_id=Showtimes.cinema_id 
                                    JOIN Screeningrooms on Screeningrooms.screeningroom_id=Showtimes.screeningroom_id ORDER BY Showtimes.show_date DESC, Showtimes.show_time DESC`);

        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const getSeat = async (screeningroomId) => {
    try {
        const result = await db.query(`SELECT * FROM Seats JOIN SeatType on SeatType.seat_type_id=Seats.seat_type_id JOIN Screeningrooms 
                                    on Screeningrooms.screeningroom_id=Seats.screeningroom_id JOIN Cinemas on Cinemas.cinema_id=Screeningrooms.cinema_id WHERE Seats.screeningroom_id = $1`, [screeningroomId]);

        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const getVoucher = async () => {
    try {
        const result = await db.query('SELECT * FROM Vouchers');

        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};
