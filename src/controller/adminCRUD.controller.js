import { addCinema, addMovie, addScreeningRoom } from "../model/adminCRUD.model";
import { deleteUser, getUserExist } from "../model/authentication.model";

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
    const { movie_id, movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link } = req.body;

    if (!movie_id || !movie_name || !movie_image || !movie_poster || !director || !category || !actors || !start_date || !duration || !language || !movie_label || !trailer_link) {
        console.log('AddMovie failed: Missing parameter');
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await addMovie(movie_id, movie_name, movie_image, movie_poster, director, category, actors, start_date, duration, language, movie_label, trailer_link);

        console.log(`Movie: add movie: ${movie_name} successfully`);
        return res.status(200).json({ message: 'Add movie successfully' });
    }
    catch (error) {
        console.error('Error adding movie:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddCinema = async (req, res) => {
    const { cinema_id, cinema_name, address, cinema_image, city_id } = req.body;

    if (!cinema_id || !cinema_name || !address || !cinema_image || !city_id){
        console.log('AddCinema failed: Missing parameter');
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await addCinema(cinema_id, cinema_name, address, cinema_image, city_id);

        console.log(`Cinema: add cinema: ${cinema_name} successfully`);
        return res.status(200).json({ message: 'Add cinema successfully' });
    }
    catch (error) {
        console.error('Error adding cinema:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const AddScreeningRoom = async (req, res) => {
    const { screeningroom_id, room_number, room_type, seat_capacity, cinema_id } = req.body;

    if (!screeningroom_id || !room_number || !room_type || !seat_capacity || !cinema_id){
        console.log('AddScreeningRoom failed: Missing parameter');
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        await addScreeningRoom(screeningroom_id, room_number, room_type, seat_capacity, cinema_id);

        console.log(`Screening room: add screening room successfully`);
        return res.status(200).json({ message: 'Add movie successfully' });
    }
    catch (error) {
        console.error('Error adding screening room:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

