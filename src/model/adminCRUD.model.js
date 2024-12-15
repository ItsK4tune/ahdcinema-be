import db from '../config/connectDB.js';

export const addMovie = async (movie_id, movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link) => {
    try {
        await db.query(`insert into Movies (movie_id, movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link) 
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10. $11, $12)`, [movie_id, movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link]);
    } 
    catch (error) {
        console.error('Error adding movie', error);
        throw error;
    }
};

export const addCinema = async (cinema_id, cinema_name, address, cinema_image, city_id) => {
    try {
        await db.query(`insert into Cinemas (cinema_id, cinema_name, address, cinema_image, city_id) 
            values ($1, $2, $3, $4, $5)`, [cinema_id, cinema_name, address, cinema_image, city_id]);
    } 
    catch (error) {
        console.error('Error adding cinema', error);
        throw error;
    }
};

export const addScreeningRoom = async (screeningroom_id, room_number, room_type, seat_capacity, cinema_id) => {
    try {
        await db.query(`insert into ScreeningRooms (screeningroom_id, room_number, room_type, seat_capacity, cinema_id) 
            values ($1, $2, $3, $4, $5)`, [screeningroom_id, room_number, room_type, seat_capacity, cinema_id]);
    } 
    catch (error) {
        console.error('Error adding screening room', error);
        throw error;
    }
};