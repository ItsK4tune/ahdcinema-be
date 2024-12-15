import { getMovie, getUserInfo } from '../model/main-page.model.js';

export const GetAll = async (req, res) => {
    const { user_id } = req.query;
    try {
        const result = await getMovie();
        // Nếu có user_id, thêm thông tin người dùng
        if (user_id) {
            const userInfo = await getUserInfo(user_id);
            result.userInfo = userInfo;
        }
        return res.status(200).json({ movies: result, userInfo: result.userInfo });
    }
    catch (error) {
        console.log(`Error getting main-page: `, error);
        res.status(500).json({ message: `Error getting main-page` });
    }
} 