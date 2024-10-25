import pool from '../config/connectDB.js';

let getCity = async () => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM city JOIN cinema ON city.cityid = cinema.cityid');

        //check whether rows is null or not
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting city:', error);
    }
}

export default getCity;