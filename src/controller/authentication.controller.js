import { getCardInfo, getCardType, getUserMemberCard } from '../model/other.model.js';
import { chooseSeat, getMovieCity, getShowDate, getShowTime } from '../model/ticket-web.model.js';
import { getMemberInfo, postUserInfo } from '../model/user.model.js';

export const GetMemberInfo = async (req, res) => {
    const {user_id} = req.query;

    if (!user_id) {
        console.log('GetMemberInfo failed: Missing user_id parameter');
        return res.status(400).json({ message: 'user_id parameter is required' });
    }

    try {
        const result = await getMemberInfo(user_id);    
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting member information: ', error);
        res.status(500).json({ message: 'Error getting member informaton' });
    }
}

export const PostMemeberInfor = async (req, res) => {
    const {user_id} = req.query;
    const updateData = req.body;

    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        console.log('No fields provided to update.');
        return res.status(400).json({ message: 'No infomation provided to update' });
    }

    try {
        await postUserInfo(user_id, updateData);
        return res.status(200).json({ message: 'Profile updated' });
    }
    catch (error) {
        console.log('Error updating member information: ', error);
        res.status(500).json({ message: 'Error updating member informaton' });
    }
}

export const GetCardType = async (res) => {
    try {
        const result = await getCardType();
        return res.status(200).json(result);
    }
    catch (error) {
        console.log('Error getting card types: ', error);
        res.status(500).json({ message: 'Error getting card types' });
    }
}

export const GetUserMemberCard = async (req, res) => {
    const { user_id }= req.query; 
    
    try {
        const result = await getUserMemberCard(user_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting user's card types: `, error);
        res.status(500).json({ message: `Error getting user's card types` });
    }
}

export const CardInfo = async (req, res) => {
    const { card_type } = req.body;

    try {
        const result = await getCardInfo(card_type);

    }
    catch (error) {
        console.log(`Error getting card info: `, error);
        res.status(500).json({ message: `Error getting card info` });
    }
}

export const GetShowDate = async (req, res) => {
    const { movie_id } = req.query;

    try {
        const result = await getShowDate(movie_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting showdate: `, error);
        res.status(500).json({ message: `Error getting showdate` });
    }
}

export const GetMovieCity = async (req, res) => {
    const { movie_id, show_date } = req.query;

    try {
        const result = await getMovieCity(movie_id, show_date);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting city: `, error);
        res.status(500).json({ message: `Error getting city` });
    }
}

export const GetShowTime = async (req, res) => {
    const { movie_id, show_date, city_id } = req.query;

    try {
        const result = await getShowTime(movie_id, show_date, city_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting showtime: `, error);
        res.status(500).json({ message: `Error getting showtime` });
    }
}

export const ChooseSeat = async (req, res) => {
    const { screeningroom_id } = req.query;

    try {
        const result = await chooseSeat(screeningroom_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error choosing seat: `, error);
        res.status(500).json({ message: `Error choosing seat` });
    }
}

export const GetVoucher = async (res) => {
    try {
        const result = await getVoucher();
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting voucher: `, error);
        res.status(500).json({ message: `Error getting voucher` });
    }
}