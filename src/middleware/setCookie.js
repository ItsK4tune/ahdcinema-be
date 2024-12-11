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
        const value = await getUserID(username);

        if (!value) {
            return res.status(404).json({ error: "User not found" });
        }
        await res.cookie('user_id', value, {
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