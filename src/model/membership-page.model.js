import pool from '../config/connectDB.js';

export const getCardType = async () => {
    try {
        const [rows, field] = await pool.execute('select * from MemberCards');
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting card types: ', error);
    }
}

export const getUserMemberCard = async (user_id) => {
    try {
        const [rows, field] = await pool.execute(`select * from MemberCards join Memberships on Membercards.card_id=UserMemberships.card_id where user_id = ? and status= ‘Active’`, [user_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting user's card types: `, error);
    }
}

export const buyCard = async (user_id, card_id) => {
    try {
        const [rows, field] = await pool.execute(`insert into CardPurchases(user_id, card_id) values (?, ?) returning purchase_id`, [user_id, card_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting purchase_id: `, error);
    }
}