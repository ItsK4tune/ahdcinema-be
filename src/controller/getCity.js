import getCity from "../model/getCity.js";

let GetCity = async (req, res) => {
    try {
        //retrieve city has cinema
        const result = await getCity();
        
        return res.status(201).json(result);
    }
    catch (error) {
        //respond with error message
        console.error('Error getting city:', error);
        res.status(404).json({message: 'Error getting city'});
    }
}

export default GetCity;