import { getBalance, getCardID, getCardInfo, updateBalance, updateFailedPurchase, updateSuccessPurchase, updateUserMemberShip } from "../model/membership-purchase.model";

export const CardPuchase = async (req, res) => {
    const { card_type, user_id } = req.query;

    if (!card_type || !user_id) {
        console.log('CardPurchase failed: Missing card_type or user_id parameter');
        return res.status(400).json({ message: 'card_type and user_id parameter is required' });
    }

    const card_id = await getCardID(card_type);

    try {
        const cardInfor = await getCardInfo(card_type);
        const balance = await getBalance(user_id);
        
        if (balance <= cardInfor.price){
            await updateFailedPurchase(user_id, card_id, cardInfor.price)
            return res.status(200).json({ message: `User balance isn't enough to make payment`});
        }

        await updateBalance(user_id, cardInfor.price);
        await updateSuccessPurchase(user_id, card_id, cardInfor.price);
        await updateUserMemberShip(user_id, card_id);
        return res.status(200).json({ message: 'Card purchase successfully'});
    }
    catch (error) {
        console.error('Error purchasing card:', error);
        res.status(500).json({message: 'Error purchasing card'});
    }
}