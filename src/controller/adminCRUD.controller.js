import { addCinema, addMovie, addScreeningRoom, addSeat, addShowTime, addVoucher, getCinema, getMovie, getScreeningroom, getSeat, getShowtime, getVoucher } from "../model/adminCRUD.model.js";
import { deleteUser, getUserExist } from "../model/authentication.model.js";

export const DeleteUser = async (req, res) => {
    const {Username, Password} = req.body;

    if (!Username) {
        console.log('Delete failed: Missing Username');
        return res.status(400).json({ message: 'Username are required' });
    }

    try {
        const user = await getUserExist(Username);

        if (!user) {
            console.log(`Delete failed: No user found for Username: ${Username}`);
            return res.status(401).json({ message: 'user not found' });
        }

        await deleteUser(Username, Password);

        console.log(`User: ${Username} deleted successfully`);
        return res.status(200).json({ message: 'User deleted successfully' });
    } 
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddMovie = async (req, res) => {
    const { movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link, description } = req.body;

    if (!movie_name || !movie_image || !director || !category || !actors || !start_date || !duration || !language || !movie_label || !trailer_link) {
        console.log('AddMovie failed: Missing parameter');
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await addMovie(movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link, description);

        console.log(`Movie: add movie: ${movie_name} successfully`);
        return res.status(200).json({ message: 'Add movie successfully' });
    }
    catch (error) {
        console.error('Error adding movie:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddCinema = async (req, res) => {
    const {cinema_name, address, cinema_image, city_id } = req.body;

    if (!cinema_name || !address || !cinema_image || !city_id){
        console.log('AddCinema failed: Missing parameter');
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await addCinema(cinema_name, address, cinema_image, city_id);

        console.log(`Cinema: add cinema: ${cinema_name} successfully`);
        return res.status(200).json({ message: 'Add cinema successfully' });
    }
    catch (error) {
        console.error('Error adding cinema:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddScreeningRoom = async (req, res) => {
    const { room_number, room_type, seat_capacity, cinema_id } = req.body;

    if (!room_number || !room_type || !seat_capacity || !cinema_id){
        console.log('AddScreeningRoom failed: Missing parameter');
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await addScreeningRoom(room_number, room_type, seat_capacity, cinema_id);

        console.log(`Screening room: add screening room successfully`);
        return res.status(200).json({ message: 'Add screening room successfully' });
    }
    catch (error) {
        console.error('Error adding screening room:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddShowTime = async (req, res) => {
    const { show_date, show_time, movie_id, cinema_id, screeningroom_id } = req.body;

    if (!show_date || !show_time || !movie_id || !cinema_id || !screeningroom_id){
        console.log('AddShowtime failed: Missing parameter');
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await addShowTime(show_date, show_time, movie_id, cinema_id, screeningroom_id);

        console.log(`Show time: add show time successfully`);
        return res.status(200).json({ message: 'Add show time successfully' });
    }
    catch (error) {
        console.error('Error adding show time:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddSeat = async (req, res) => {
    const { seat_id, seat_number, is_available, seat_type_id, screeningroom_id } = req.body;

    if (!seat_id || !seat_number || !seat_type_id || !screeningroom_id){
        console.log('AddSeat failed: Missing parameter');
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await addSeat(seat_id, seat_number, is_available, seat_type_id, screeningroom_id);

        console.log(`Seat: add seat successfully`);
        return res.status(200).json({ message: 'Add seat successfully' });
    }
    catch (error) {
        console.error('Error adding seat:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddVoucher = async (req, res) => {
    const { voucher_name, voucher_code, expiry_date, voucher_value } = req.body;

    if (!voucher_name || !voucher_code || !expiry_date ||!voucher_value){
        console.log('AddVoucher failed: Missing parameter');
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await addVoucher(voucher_name, voucher_code, expiry_date, voucher_value);

        console.log(`Voucher: add voucher successfully`);
        return res.status(200).json({ message: 'Add voucher successfully' });
    }
    catch (error) {
        console.error('Error adding voucher:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const GetMovie = async (req, res) => {
    try {
        const result = await getMovie();
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting movie: `, error);
        res.status(500).json({ message: `Error getting movie` });
    }
}
export const GetCinema = async (req, res) => {

    try {
        const result = await getCinema();
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting cinema: `, error);
        res.status(500).json({ message: `Error getting cinema` });
    }
}
export const GetScreeningroom = async (req, res) => {
    const { cinema_id } = req.query;

    if (!cinema_id) {
        console.log('GetScreeningroom failed: Missing cinema_id parameter');
        return res.status(400).json({ message: 'cinema_id parameter is required' });
    }
    try {
        const result = await getScreeningroom(cinema_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting screeningroom: `, error);
        res.status(500).json({ message: `Error getting screeningroom` });
    }
}
export const GetSeat = async (req, res) => {
    const { screeningroom_id } = req.query;

    if (!screeningroom_id) {
        console.log('GetScreeningroom failed: Missing screeningroom_id parameter');
        return res.status(400).json({ message: 'screeningroom_id parameter is required' });
    }
    try {
        const result = await getSeat(screeningroom_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting seats info: `, error);
        res.status(500).json({ message: `Error getting seats info` });
    }
}
export const GetShowTime = async (req, res) => {
    try {
        const result = await getShowtime();
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting showtime: `, error);
        res.status(500).json({ message: `Error getting showtime` });
    }
}
export const GetVoucher = async (req, res) => {
    try {
        const result = await getVoucher();
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting voucher: `, error);
        res.status(500).json({ message: `Error getting voucher` });
    }
}