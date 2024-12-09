import db from '../config/connectDB.js';

export const getCardInfo = async (card_type) => {
    try {
        const [rows, field] = await db.query(`select card_id, price, duration from Membercards where card_type = $1`, [card_type]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting card info: `, error);
    }
}

export const getBalance = async (user_id) => {
    try {
        const [rows, field] = await db.query(`select wallet_balance from Userinfo where user_id = $1`, [user_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting user's balance: `, error);
    }
}

export const updateBalance = async (user_id, price) => {
    try {
        await db.query(`update Userinfo set wallet_balance = wallet_balance - $1 where user_id = $2`, [price, user_id]);
    } 
    catch (error) {
        console.error(`Error updating user's balance: `, error);
    }
}

export const updateSuccessPurchase = async (user_id, card_id, price) => {
    try {
        await db.query(`insert into Purchases (user_id, card_id, total_amount, payment_status) values ($1, $2, $3, 'Completed')`, [user_id, card_id, price]);
    } 
    catch (error) {
        console.error(`Error updating purchase history: `, error);
    }
}

export const updateFailedPurchase = async (user_id, card_id, price) => {
    try {
        await db.query(`insert into Purchases (user_id, card_id, total_amount, payment_status) values ($1, $2, $3, 'Failed')`, [user_id, card_id, price]);
    } 
    catch (error) {
        console.error(`Error updating purchase history: `, error);
    }
}

export const updateUserMemberShip = async (user_id, card_id) => {
    try {
        await db.query(`update Memberships set status= ‘Expired’ where user_id = $1 and status= ‘Active’`, [user_id]);
        const duration = await db.query(`select duration from MemberCards where user_id = $1 `, [user_id]);
        await db.query(`insert into UserMemberships (user_id, card_id, purchase_date, expiry_date, status) values ($1, $2, CURRENT_DATE, CURRENT_DATE + interval $3 month, 'Active')`, [user_id, card_id, duration]);
    } 
    catch (error) {
        console.error(`Error updating user membership: `, error);
    }
}

export const getCardID = async (card_type) => {
    try {
        await db.query(`select card_id from MemberCards where card_type = $1`, [card_id]);
    } 
    catch (error) {
        console.error(`Error getting card_id: `, error);
    }
}