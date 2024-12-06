import { getMovie, getPoster, getUserInfo } from '../model/main-page.model.js';

export const GetAll = async (req, res) => {
    const { user_id } = req.query;

    try {
        const result = await getMovie() + await getPoster();
        if (user_id){
            result += await getUserInfo();
        }
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting info: `, error);
        res.status(500).json({ message: `Error getting info` });
    }
} 