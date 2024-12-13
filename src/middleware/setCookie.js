import { getAdminID } from '../model/admin.model.js';
import { getUserID } from '../model/authentication.model.js';

export const setAdminCookie = async (req, res) => {
    try {
        const username = req.session.user?.username;

        if (!username) {
            return res.status(400).json({ error: "No user information in session" });
        }
        const value = await getAdminID(username);

        if (!value) {
            return res.status(404).json({ error: "User not found" });
        }
        await res.cookie('admin_id', value, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return res.json({ message: "Cookie has been set!" });
    } catch (error) {
        console.error("Error in setCookie:", error);
        res.status(500).json({ error: "Failed to set cookie" });
    }
};

export const setUserCookie = async (req, res) => {
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