import getShowTime from "../model/getShowTime.js";

let GetShowTime = async (req, res) => {
    const {cinema_id, show_date} = req.query;

    try {
        //retrieve cinema in input city_id
        const result = await getShowTime(cinema_id, show_date);
        
        return res.status(201).json(result);
    }
    catch (error) {
        //respond with error message
        console.error('Error getting showtimes:', error);
        res.status(404).json({message: 'Error getting showtimes'});
    }
}

export default GetShowTime;