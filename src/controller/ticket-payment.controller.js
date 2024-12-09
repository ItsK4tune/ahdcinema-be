import { getCardInfo, getTicketInfo, postTicket, postCard } from '../model/ticket-payment.model.js';

export const GetTicketInfo = async (req, res) => {
    const { ticket_id } = req.query;

    if (!ticket_id) {
        console.log('GetTicketInfo failed: Missing ticket_id parameter');
        return res.status(400).json({ message: 'ticket_id parameter is required' });
    }
    try {
        const result = await getTicketInfo(ticket_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting ticket info: `, error);
        res.status(500).json({ message: `Error getting ticket info` });
    }
}

export const GetCardInfo = async (req, res) => {
    const { purchase_id } = req.query;

    if (!purchase_id) {
        console.log('GetTicketInfo failed: Missing ticket_id parameter');
        return res.status(400).json({ message: 'ticket_id parameter is required' });
    }
    try {
        const result = await getCardInfo(purchase_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting card info: `, error);
        res.status(500).json({ message: `Error getting card info` });
    }
}

export const PostTicket = async (req, res) => {
    const { wallet_balance, is_paid, ticket_id } = req.body;

    if ( wallet_balance == null|| is_paid == null|| !ticket_id) {
        console.log('PostTicket failed: Missing wallet_balance, is_paid or ticket_id parameter');
        return res.status(400).json({ message: 'wallet_balance, is_paid and ticket_id parameter is required' });
    }
    try {
        if (!is_paid){
            throw new Error(`Can't update ticket because it isn't being paid`);
        }
        const result = await postTicket(wallet_balance, ticket_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error posting ticket: `, error);
        res.status(500).json({ message: `Error posting ticket` });
    }
}

export const PostCard = async (req, res) => {
    const { wallet_balance, is_paid, purchase_id } = req.body;

    if ( wallet_balance ==null || is_paid ==null || !purchase_id) {
        console.log('PostCard failed: Missing wallet_balance, is_paid or purchase_id parameter');
        return res.status(400).json({ message: 'wallet_balance, is_paid and purchase_id parameter is required' });
    }
    try {
        if (!is_paid){
            throw new Error(`Can't update card because it isn't being paid`);
        }
        const result = await postCard(wallet_balance, purchase_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error posting ticket: `, error);
        res.status(500).json({ message: `Error posting ticket` });
    }
}