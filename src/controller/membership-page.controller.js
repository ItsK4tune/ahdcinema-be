import { buyCard, getCardType, getUserMemberCard } from '../model/membership-page.model.js';

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
    const { user_id } = req.query; 

    if (!user_id) {
        console.log('GetUserMemberCard failed: Missing user_id parameter');
        return res.status(400).json({ message: 'user_id parameter is required' });
    }
    
    try {
        const result = await getUserMemberCard(user_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting user's card types: `, error);
        res.status(500).json({ message: `Error getting user's card` });
    }
}

export const BuyCard = async (req, res) => {
    const { user_id, card_id } = req.query;

    if (!user_id || !card_id) {
        console.log('BuyCard failed: Missing user_id or card_id parameter');
        return res.status(400).json({ message: 'user_id and card_id parameter are required' });
    }

    try {
        const result = await buyCard(user_id, card_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error returning purchase_id: `, error);
        res.status(500).json({ message: `Error returning purchase_id ` });
    }
}