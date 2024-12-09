import db from '../config/connectDB.js';

export const getCardType = async () => {
    try {
        const [rows, field] = await db.query('select * from MemberCards');
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting card types: ', error);
    }
}

export const getUserMemberCard = async (user_id) => {
    try {
        const [rows, field] = await db.query(`select * from MemberCards join Memberships on Membercards.card_id=UserMemberships.card_id where user_id = $1 and status= ‘Active’`, [user_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting user's card: `, error);
    }
}

export const buyCard = async (user_id, card_id) => {
    try {
        const [rows, field] = await db.query(`insert into CardPurchases(user_id, card_id) values ($1, $2) returning purchase_id`, [user_id, card_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error(`Error getting purchase_id: `, error);
    }
}