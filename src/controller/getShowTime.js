import getShowTime from "../model/getShowTime.js";

let GetShowTime = async (req, res) => {
    const {cinema_id, show_date, curr_time} = req.query;

    try {
        //retrieve cinema in input city_id
        const result = await getShowTime(cinema_id, show_date, curr_time);
        
        return res.status(201).json(result);
    }
    catch (error) {
        //respond with error message
        console.error('Error getting showtime:', error);
        res.status(404).json({message: 'Error getting showtime'});
    }
}

export default GetShowTime;