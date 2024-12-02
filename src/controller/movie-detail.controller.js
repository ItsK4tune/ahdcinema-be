import { getMovieContent } from '../model/movie-detail.model.js';

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
