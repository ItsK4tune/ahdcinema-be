import { getCinema, getCity, getCurrentMovie, getMovieContent, getShowTime, getUpcomingMovie } from '../model/other.model.js';

export const GetCity = async (res) => {
    try {
        const result = await getCity();
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error getting city:', error);
        return res.status(500).json({ message: 'Error getting city' });
    }
}

export const GetCinema = async (req, res) => {
    const { city_id } = req.query;

    if (!city_id) {
        console.log('GetCinema failed: Missing city_id parameter');
        return res.status(400).json({ message: 'city_id parameter is required' });
    }

    try {
        const result = await getCinema(city_id);
        return res.status(200).json(result);
    } 
    catch (error) {
        console.error('Error getting cinema:', error);
        return res.status(500).json({ message: 'Error getting cinema' });
    }
}

export const GetShowTime = async (req, res) => {
    const {cinema_id, show_date} = req.query;

    if (!cinema_id || !show_date) {
        console.log('GetShowTime failed: Missing cinema_id, show_date parameter');
        return res.status(400).json({ message: 'city_id and show_date parameter is required' });
    }

    try {
        const result = await getShowTime(cinema_id, show_date);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting showtimes:', error);
        res.status(500).json({message: 'Error getting showtimes'});
    }
}

export const GetCurrentMovie = async (res) => {
    try {
        const result = await getCurrentMovie();
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting now-showing movies:', error);
        res.status(500).json({message: 'Error now-showing movies'});
    }
}

export const GetUpcomingMovie = async (res) => {
    try {
        const result = await getUpcomingMovie();
        
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting upcoming movies:', error);
        res.status(500).json({message: 'Error getting upcoming movies'});
    }
}

export const GetMovieContent = async (req, res) => {
    const {movie_id} = req.query;

    if (!movie_id) {
        console.log('GetMovieContent failed: Missing movie_id parameter');
        return res.status(400).json({ message: 'movie_id parameter is required' });
    }

    try {
        const result = await getMovieContent(movie_id)        
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting movie details:', error);
        res.status(500).json({message: 'Error getting movie details'});
    }
}

