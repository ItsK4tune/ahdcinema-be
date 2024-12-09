import { getMovie, getPoster, getUserInfo } from '../model/main-page.model.js';

export const GetAll = async (req, res) => {
    const { user_id } = req.query;

    // try {
    //     const result = await getMovie() + await getPoster();
    //     if (user_id){
    //         result += await getUserInfo();
    //     }
    //     return res.status(200).json(result);
    try {
        // Chạy các hàm không phụ thuộc lẫn nhau đồng thời
        const [movies, posters] = await Promise.all([getMovie(), getPoster()]);

        let result = { movies, posters };

        // Nếu có user_id, thêm thông tin người dùng
        if (user_id) {
            const userInfo = await getUserInfo(user_id);
            result.userInfo = userInfo;
        }

        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting main-page: `, error);
        res.status(500).json({ message: `Error getting main-page` });
    }
} 