import pool from '../config/connectDB.js';

export const getTicketInfo = async (ticket_id) => {
    try {
        const [rows, field] = await pool.execute(`select * from Tickets join Seats on Seats.seat_id = Tickets.seat_id join Showtimes on Showtimes.showtime_id = Tickets.showtime_id 
                                                    join Vouchers on Vouchers.voucher_id = Tickets.voucher_id join UserInfo on UserInfo.user_id=Tickets.user_id where ticket_id = ?`, [ticket_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting ticket info: ', error);
    }
}

export const getCardInfo = async (purchase_id) => {
    try {
        const [rows, field] = await pool.execute(`select * from CardPurchases join UserInfo on UserInfo.user_id=CardPurchases.user_id 
                                                    join MemberCards on MemberCards.card_id=CardPurchases.card_id where purchase_id = ?`, [purchase_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting card info: ', error);
    }
}

export const postTicket = async (wallet_balance, ticket_id) => {
    try {
        await connection.beginTransaction();

        await connection.execute(
        `UPDATE Tickets 
        SET is_paid = TRUE, booking_date = CURRENT_TIMESTAMP 
        WHERE ticket_id = ?`, [ticket_id]);

        await connection.execute(
        `UPDATE UserInfo 
        SET wallet_balance = wallet_balance - ? 
        WHERE user_id = (SELECT user_id FROM Tickets WHERE ticket_id = ?)`, [wallet_balance, ticket_id]);

        await connection.execute(
        `UPDATE Seats 
        SET is_available = FALSE 
        WHERE seat_id = (SELECT seat_id FROM Tickets WHERE ticket_id = ?)`, [ticket_id]);

        await connection.execute(
            `UPDATE Vouchers 
            SET status = 'Inactive' 
            WHERE voucher_id = (SELECT voucher_id FROM Tickets WHERE ticket_id = ?)`, [ticket_id]);
    
        await connection.commit();
    } 
    catch (error) {
        console.error('Error posting ticket info: ', error);
    }
}

export const postCard = async (wallet_balance, purchase_id) => {
    try {
        await connection.beginTransaction();

        await connection.execute(
        `UPDATE CardPurchases 
        SET is_paid = TRUE, purchase_date = CURRENT_TIMESTAMP 
        WHERE purchase_id = ?`, [purchase_id]);

        await connection.execute(
        `UPDATE UserInfo 
        SET wallet_balance = wallet_balance - ? 
        WHERE user_id = (SELECT user_id FROM CardPurchases WHERE purchase_id = ?)`, [amount, purchase_id]); 

        await connection.execute(
        `UPDATE Seats 
        SET is_available = FALSE 
        WHERE seat_id = (SELECT seat_id FROM Tickets WHERE ticket_id = ?)`, [ticket_id]);

        await connection.execute(
        `insert into UserMemberships
        (user_id, card_id, purchase_date, expiry_date)
        values (<user_id>, <card_id>, CURRENT_TIMESTAMP,   
        CURRENT_TIMESTAMP + interval <duration> month)`, [purchase_id, purchase_id, purchase_id]);
    
        await connection.commit();
    } 
    catch (error) {
        console.error('Error getting card info: ', error);
    }
}