import { addCinema, addMovie, addScreeningRoom, addSeat, addShowTime, addVoucher, deleteCinema, deleteMovie, 
    deleteScreeningRoom, deleteSeat, deleteShowTime, deleteVoucher, getCinema, getMovie, getScreeningroom, 
    getSeat, getShowtime, getVoucher, updateCinema, updateMovie, updateScreeningroom, updateSeat, updateShowTime, updateVoucher } from "../model/adminCRUD.model.js";
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

export const UpdateMovie = async (req, res) => {
    const {movie_id} = req.query;
    const updateData = req.body;
    
    if (!movie_id) {
        console.log('Missing movie_id.');
        return res.status(400).json({ message: 'movie_id is required' });
    }
    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        console.log('No fields provided to update.');
        return res.status(400).json({ message: 'No infomation provided to update' });
    }

    try {
        const isUpdated = await updateMovie(movie_id, updateData);
        if (isUpdated) {
            return res.status(200).json({ message: 'Movie updated' });
        } else {
            return res.status(404).json({ message: 'Movie not found' });
        }
    }
    catch (error) {
        console.log('Error updating movie: ', error);
        res.status(500).json({ message: 'Error updating movie' });
    }
}

export const UpdateCinema = async (req, res) => {
    const {cinema_id} = req.query;
    const updateData = req.body;
    
    if (!cinema_id) {
        console.log('Missing cinema_id.');
        return res.status(400).json({ message: 'cinema_id is required' });
    }
    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        console.log('No fields provided to update.');
        return res.status(400).json({ message: 'No infomation provided to update' });
    }

    try {
        const isUpdated = await updateCinema(cinema_id, updateData);
        if (isUpdated) {
            return res.status(200).json({ message: 'Cinema updated' });
        } else {
            return res.status(404).json({ message: 'Cinema not found' });
        }
    }
    catch (error) {
        console.log('Error updating cinema: ', error);
        res.status(500).json({ message: 'Error updating cinema' });
    }
}

export const UpdateScreeningroom = async (req, res) => {
    const {screeningroom_id} = req.query;
    const updateData = req.body;
    
    if (!screeningroom_id) {
        console.log('Missing screeningroom_id.');
        return res.status(400).json({ message: 'screeningroom_id is required' });
    }
    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        console.log('No fields provided to update.');
        return res.status(400).json({ message: 'No infomation provided to update' });
    }

    try {
        const isUpdated = await updateScreeningroom(screeningroom_id, updateData);
        if (isUpdated) {
            return res.status(200).json({ message: 'Screening room updated' });
        } else {
            return res.status(404).json({ message: 'Screening room not found' });
        }
    }
    catch (error) {
        console.log('Error updating screeing room: ', error);
        res.status(500).json({ message: 'Error updating screening room' });
    }
}

export const UpdateShowTime = async (req, res) => {
    const {showtime_id} = req.query;
    const updateData = req.body;
    
    if (!showtime_id) {
        console.log('Missing showtime_id.');
        return res.status(400).json({ message: 'showtime_id is required' });
    }
    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        console.log('No fields provided to update.');
        return res.status(400).json({ message: 'No infomation provided to update' });
    }

    try {
        const isUpdated = await updateShowTime(showtime_id, updateData);
        if (isUpdated) {
            return res.status(200).json({ message: 'Show time updated' });
        } else {
            return res.status(404).json({ message: 'Show time not found' });
        }
    }
    catch (error) {
        console.log('Error updating show time: ', error);
        res.status(500).json({ message: 'Error updating show time' });
    }
}

export const UpdateSeat = async (req, res) => {
    const {seat_id} = req.query;
    const updateData = req.body;
    
    if (!seat_id) {
        console.log('Missing seat_id.');
        return res.status(400).json({ message: 'seat_id is required' });
    }
    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        console.log('No fields provided to update.');
        return res.status(400).json({ message: 'No infomation provided to update' });
    }

    try {
        const isUpdated = await updateSeat(seat_id, updateData);
        if (isUpdated) {
            return res.status(200).json({ message: 'Seat updated' });
        } else {
            return res.status(404).json({ message: 'Seat not found' });
        }
    }
    catch (error) {
        console.log('Error updating seat: ', error);
        res.status(500).json({ message: 'Error updating seat' });
    }
}

export const UpdateVoucher = async (req, res) => {
    const {voucher_id} = req.query;
    const updateData = req.body;
    
    if (!voucher_id) {
        console.log('Missing voucher_id.');
        return res.status(400).json({ message: 'voucher_id is required' });
    }
    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        console.log('No fields provided to update.');
        return res.status(400).json({ message: 'No infomation provided to update' });
    }

    try {
        const isUpdated = await updateVoucher(voucher_id, updateData);
        if (isUpdated) {
            return res.status(200).json({ message: 'Voucher updated' });
        } else {
            return res.status(404).json({ message: 'Voucher not found' });
        }
    }
    catch (error) {
        console.log('Error updating voucher: ', error);
        res.status(500).json({ message: 'Error updating voucher' });
    }
}

export const DeleteMovie = async (req, res) => {
    const { movie_id } = req.body;

    if (!movie_id) {
        console.log('Missing movie_id.');
        return res.status(400).json({ message: 'movie_id is required' });
    }

    try {
        await deleteMovie(movie_id);

        console.log(`Movie: delete movie: ${movie_id} successfully`);
        return res.status(200).json({ message: 'Delete movie successfully' });
    }
    catch (error) {
        console.error('Error deleting movie:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const DeleteCinema = async (req, res) => {
    const { cinema_id } = req.body;

    if (!cinema_id) {
        console.log('Missing cinema_id.');
        return res.status(400).json({ message: 'cinema_id is required' });
    }

    try {
        await deleteCinema(cinema_id);

        console.log(`Cinema: delete cinema: ${cinema_name} successfully`);
        return res.status(200).json({ message: 'Add cinema successfully' });
    }
    catch (error) {
        console.error('Error deleting cinema:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const DeleteScreeningroom = async (req, res) => {
    const { screeningroom_id } = req.body;

    if (!screeningroom_id) {
        console.log('Missing screeningroom_id.');
        return res.status(400).json({ message: 'screeningroom_id is required' });
    }

    try {
        await deleteScreeningRoom(screeningroom_id);

        console.log(`Screening room: delete screening room successfully`);
        return res.status(200).json({ message: 'Delete screening room successfully' });
    }
    catch (error) {
        console.error('Error deleting screening room:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const DeleteShowTime = async (req, res) => {
    const { showtime_id } = req.body;

    if (!showtime_id) {
        console.log('Missing showtime_id.');
        return res.status(400).json({ message: 'showtime_id is required' });
    }

    try {
        await deleteShowTime(showtime_id);

        console.log(`Show time: delete show time successfully`);
        return res.status(200).json({ message: 'Delete show time successfully' });
    }
    catch (error) {
        console.error('Error deleting show time:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const DeleteSeat = async (req, res) => {
    const { seat_id } = req.body;

    if (!seat_id) {
        console.log('Missing seat_id.');
        return res.status(400).json({ message: 'seat_id is required' });
    }

    try {
        await deleteSeat(seat_id);

        console.log(`Seat: delete seat successfully`);
        return res.status(200).json({ message: 'Delete seat successfully' });
    }
    catch (error) {
        console.error('Error deleting seat:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const DeleteVoucher = async (req, res) => {
    const { voucher_id } = req.body;

    if (!voucher_id) {
        console.log('Missing voucher_id.');
        return res.status(400).json({ message: 'voucher_id is required' });
    }

    try {
        await deleteVoucher(voucher_id);

        console.log(`Voucher: delete voucher successfully`);
        return res.status(200).json({ message: 'Delete voucher successfully' });
    }
    catch (error) {
        console.error('Error deleting voucher:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
