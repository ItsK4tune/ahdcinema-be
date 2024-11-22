import getMovieContent from "../model/GetMovieContent.js";

let GetMovieContent = async (req, res) => {
    const {movie_id} = req.query;

    try {
        //retrieve cinema in input city_id
        const result = await getMovieContent(movie_id)
        
        return res.status(201).json(result);
    }
    catch (error) {
        //respond with error message
        console.error('Error getting movie details:', error);
        res.status(404).json({message: 'Error getting movie details'});
    }
}

export default GetMovieContent;