import getUpcomingMovie from "../model/getCurrentMovie.js";

let GetUpcomingMovie = async (req, res) => {
    const {curr_time} = req.query;

    try {
        //retrieve cinema in input city_id
        const result = await getUpcomingMovie(curr_time);
        
        return res.status(201).json(result);
    }
    catch (error) {
        //respond with error message
        console.error('Error getting movie list:', error);
        res.status(404).json({message: 'Error getting movie list'});
    }
}

export default GetUpcomingMovie;