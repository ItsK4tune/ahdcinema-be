import getCinema from "../model/getCinema.js";

let GetCinema = async (req, res) => {
    const {city_id} = req.query;

    try {
        //retrieve cinema in input city_id
        const result = await getCinema(city_id);
        
        return res.status(201).json(result);
    }
    catch (error) {
        //respond with error message
        console.error('Error getting cinema:', error);
        res.status(404).json({message: 'Error getting cinema'});
    }
}

export default GetCinema;