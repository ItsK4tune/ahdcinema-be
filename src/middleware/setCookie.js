import { getUserID } from '../model/authentication.model.js';


export const setCookie = async (req, res) => {
    const value = await getUserID(req.session.user?.username || req.session.passport?.username);
    
    res.cookie('user_id', value, {
        httpOnly: true, // Makes the cookie accessible only by the web server
        secure: true, // Ensures the cookie is sent over HTTPS
        sameSite: 'Strict' // Controls cookie sending in cross-site requests
    });
    return res.json('Cookie has been set!');
}