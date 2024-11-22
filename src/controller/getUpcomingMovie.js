import getUpcomingMovie from "../model/getCurrentMovie.js";

let GetUpcomingMovie = async (req, res) => {
    try {
        //retrieve cinema in input city_id
        const result = await getUpcomingMovie();
        
        return res.status(201).json(result);
    }
    catch (error) {
        //respond with error message
        console.error('Error getting upcoming movies:', error);
        res.status(404).json({message: 'Error getting upcoming movies'});
    }
}

export default GetUpcomingMovie;