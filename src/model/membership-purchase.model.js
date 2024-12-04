import pool from '../config/connectDB.js';

export const getCardInfo = async (card_type) => {
    try {
        const [rows, field] = await pool.execute(`select card_id, price, duration from Membercards where card_type = ?`, [card_type]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting card info: `, error);
    }
}

export const getBalance = async (user_id) => {
    try {
        const [rows, field] = await pool.execute(`select wallet_balance from Userinfo where user_id = ?`, [user_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting user's balance: `, error);
    }
}

export const updateBalance = async (user_id, price) => {
    try {
        await pool.execute(`update Userinfo set wallet_balance = wallet_balance - ? where user_id = ?`, [price, user_id]);
    } 
    catch (error) {
        console.error(`Error updating user's balance: `, error);
    }
}

export const updateSuccessPurchase = async (user_id, card_id, price) => {
    try {
        await pool.execute(`insert into Purchases (user_id, card_id, total_amount, payment_status) values (?, ?, ?, 'Completed')`, [user_id, card_id, price]);
    } 
    catch (error) {
        console.error(`Error updating purchase history: `, error);
    }
}

export const updateFailedPurchase = async (user_id, card_id, price) => {
    try {
        await pool.execute(`insert into Purchases (user_id, card_id, total_amount, payment_status) values (?, ?, ?, 'Failed')`, [user_id, card_id, price]);
    } 
    catch (error) {
        console.error(`Error updating purchase history: `, error);
    }
}

export const updateUserMemberShip = async (user_id, card_id) => {
    try {
        await pool.execute(`update Memberships set status= ‘Expired’ where user_id = ? and status= ‘Active’`, [user_id]);
        const duration = await pool.execute(`select duration from MemberCards where user_id = ?`, [user_id]);
        await pool.execute(`insert into UserMemberships (user_id, card_id, purchase_date, expiry_date, status) values (?, ?, CURRENT_DATE, CURRENT_DATE + interval ? month, 'Active')`, [user_id, card_id, duration]);
    } 
    catch (error) {
        console.error(`Error updating user membership: `, error);
    }
}

export const getCardID = async (card_type) => {
    try {
        await pool.execute(`select card_id from MemberCards where card_type = ?`, [card_id]);
    } 
    catch (error) {
        console.error(`Error getting card_id: `, error);
    }
}