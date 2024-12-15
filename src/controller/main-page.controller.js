import { getHotMovie, getUserAccount} from '../model/main-page.model.js';

export const GetHotMovie = async (req, res) => {
    try {
        const result = await getHotMovie();
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting main-page: `, error);
        res.status(500).json({ message: `Error getting main-page` });
    }
} 
export const GetUserAccount= async (req, res) => {
    const {user_id}=req.query;
    try {
        const result = await getUserAccount(user_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting main-page: `, error);
        res.status(500).json({ message: `Error getting main-page` });
    }
} 
