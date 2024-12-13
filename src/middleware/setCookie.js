import { getUserID } from '../model/authentication.model.js';


// export const setCookie = async (req, res) => {
//     const userId = await getUserID(req.session.user?.username || req.session.passport?.username);
    
//     res.cookie('user_id', userId, {
//         httpOnly: true, // Makes the cookie accessible only by the web server
//         secure: true, // Ensures the cookie is sent over HTTPS
//         sameSite: 'Strict' // Controls cookie sending in cross-site requests
//     });
//     return res.json('Cookie has been set!');
// }
export const setCookie = async (req, res, next) => {
    try {
        const username = req.session.user?.username || req.session.passport?.user?.email;
        if (!username) {
            return res.status(400).json({ error: "No user information in session" });
        }
        const userId = await getUserID(username);
        console.log(userId);
        if (!userId) {
            return res.status(404).json({ error: "User not found" });
        } 
        //setup như phía dưới để lấy được user_id trực tiếp từ FE (chỉ dùng cho BTL chứ thực tế không an toàn)
        res.cookie('user_id', userId, {
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
        });
        next()
    } catch (error) {
        console.error("Error in setCookie:", error);
        res.status(500).json({ error: "Failed to set cookie" });
    }
};