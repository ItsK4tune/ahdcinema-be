import { getUserID } from '../model/authentication.model.js';


// export const setCookie = async (req, res) => {
//     const value = await getUserID(req.session.user?.username || req.session.passport?.username);
    
//     res.cookie('user_id', value, {
//         httpOnly: true, // Makes the cookie accessible only by the web server
//         secure: true, // Ensures the cookie is sent over HTTPS
//         sameSite: 'Strict' // Controls cookie sending in cross-site requests
//     });
//     return res.json('Cookie has been set!');
// }
export const setCookie = async (req, res) => {
    try {
        const username = req.session.user?.username || req.session.passport?.user?.email;
        if (!username) {
            return res.status(400).json({ error: "No user information in session" });
        }
        const value = await getUserID(username);
        if (!value) {
            return res.status(404).json({ error: "User not found" });
        }
        res.cookie('user_id', value, {
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