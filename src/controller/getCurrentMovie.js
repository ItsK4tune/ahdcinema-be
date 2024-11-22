import getCurrentMovie from "../model/getCurrentMovie.js";

let GetCurrentMovie = async (req, res) => {
    try {
        //retrieve cinema in input city_id
        const result = await getCurrentMovie();
        
        return res.status(201).json(result);
    }
    catch (error) {
        //respond with error message
        console.error('Error getting now-showing movies:', error);
        res.status(404).json({message: 'Error now-showing movies'});
    }
}

export default GetCurrentMovie;