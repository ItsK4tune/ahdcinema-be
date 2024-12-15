import { getHistory, getWallet, postWallet } from '../model/log-page.model.js';

export const GetWallet = async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        console.log('GetWallet failed: Missing user_id parameter');
        return res.status(400).json({ message: 'user_id parameter is required' });
    }
    try {
        const result = await getWallet(user_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting card info: `, error);
        res.status(500).json({ message: `Error getting card info` });
    }
}

export const PostWallet = async (req, res) => {
    const { topup_value, user_id } = req.query;

    if (!user_id || !topup_value) {
        console.log('PostWallet failed: Missing user_id or topup_value parameter');
        return res.status(400).json({ message: 'user_id and topup_value parameter are required' });
    }
    try {
        await postWallet(topup_value, user_id);
        return res.status(200).json({ message: `Payment completed successfully` });
    }
    catch (error) {
        console.log(`Error updating wallet: `, error);
        res.status(500).json({ message: `Error updating wallet` });
    }
}

export const GetHistory = async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        console.log('GetHistory failed: Missing user_id parameter');
        return res.status(400).json({ message: 'user_id parameter is required' });
    }
    try {
        const result = await getHistory(user_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting card info: `, error);
        res.status(500).json({ message: `Error getting card info` });
    }
}