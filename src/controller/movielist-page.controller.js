import { getCurrentMovie, getUpcomingMovie } from '../model/movielist-page.model.js';

export const GetCurrentMovie = async (req, res) => {
    try {
        const result = await getCurrentMovie();
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting now-showing movies:', error);
        res.status(500).json({message: 'Error now-showing movies'});
    }
}

export const GetUpcomingMovie = async (req, res) => {
    try {
        const result = await getUpcomingMovie();
        
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting upcoming movies:', error);
        res.status(500).json({message: 'Error getting upcoming movies'});
    }
}