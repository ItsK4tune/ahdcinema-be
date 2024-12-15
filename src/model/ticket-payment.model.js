import db from '../config/connectDB.js';

export const getTicketInfo = async (ticket_id) => {
    try {
        const result = await db.query(`select * from Tickets JOIN Seats ON Tickets.seat_id = Seats.seat_id JOIN SeatType ON SeatType.seat_type_id = Seats.seat_type_id
                                            JOIN Screeningrooms ON ScreeningRooms.screeningroom_id=Seats.screeningroom_id JOIN Cinemas ON ScreeningRooms.cinema_id=Cinemas.cinema_id
                                            JOIN Showtimes ON Showtimes.showtime_id=Tickets.showtime_id JOIN Movies ON Movies.movie_id=Showtimes.movie_id
                                            JOIN Vouchers ON Vouchers.voucher_id=Tickets.voucher_id JOIN UserInfo on UserInfo.user_id=Tickets.user_id where ticket_id = $1`, [ticket_id]);
        return result.rows.length ? result.rows[0] : null
    } 
    catch (error) {
        console.error('Error getting ticket info: ', error);
    }
}

export const getCardInfo = async (purchase_id) => {
    try {
        const result = await db.query(`select * from CardPurchases join UserInfo on UserInfo.user_id=CardPurchases.user_id 
                                                    join MemberCards on MemberCards.card_id=CardPurchases.card_id where purchase_id = $1`, [purchase_id]);
        return result.rows.length ? result.rows[0] : null
    } 
    catch (error) {
        console.error('Error getting card info: ', error);
    }
}

export const postTicket = async (wallet_balance, ticket_id) => {
    const client = await db.connect(); // Lấy một kết nối từ Pool
    try {
        // Bắt đầu giao dịch
        await client.query("BEGIN");

        await client.query(
            `UPDATE Tickets 
             SET is_paid = TRUE, booking_date = CURRENT_TIMESTAMP 
             WHERE ticket_id = $1`,
            [ticket_id] // Sử dụng CURRENT_TIMESTAMP của Postgre
        );


        await client.query(
            `UPDATE UserInfo 
             SET wallet_balance = wallet_balance - $1 
             WHERE user_id = (SELECT user_id FROM Tickets WHERE ticket_id = $2)`,
            [wallet_balance, ticket_id]
        );

        await client.query(
            `UPDATE Seats 
             SET is_available = FALSE 
             WHERE seat_id = (SELECT seat_id FROM Tickets WHERE ticket_id = $1)`,
            [ticket_id]
        );

        await client.query(
            `UPDATE Vouchers 
             SET status = 'Inactive' 
             WHERE voucher_id = (SELECT voucher_id FROM Tickets WHERE ticket_id = $1)`,
            [ticket_id]
        );

        // Cam kết giao dịch
        await client.query("COMMIT");
        console.log("Transaction completed successfully.");
    } catch (error) {
        // Hoàn tác giao dịch nếu xảy ra lỗi
        await client.query("ROLLBACK");
        console.error("Transaction failed:", error);
    } finally {
        // Trả kết nối lại vào Pool
        client.release();
    }
};


export const postCard = async (wallet_balance, purchase_id) => {
    const client = await db.connect();
    try {
        const result = await client.query(`
          SELECT user_id, MemberCards.card_id, duration 
          FROM MemberCards 
          JOIN CardPurchases ON MemberCards.card_id = CardPurchases.card_id 
          WHERE purchase_id = $1`, [purchase_id]);

        if (result.rows.length === 0) {
            throw new Error("No data found for the provided purchase_id");
        }

        const { user_id, card_id, duration } = result.rows[0];

        await client.query("BEGIN");

        await client.query(`
          UPDATE CardPurchases 
          SET is_paid = TRUE, purchase_date = CURRENT_TIMESTAMP 
          WHERE purchase_id = $1`, [purchase_id]); // Sử dụng CURRENT_TIMESTAMP của Postgre

        await client.query(`
          UPDATE UserInfo 
          SET wallet_balance = $1 
          WHERE user_id = $2`, [wallet_balance, user_id]);

        await client.query(`
          INSERT INTO UserMemberships 
          (user_id, card_id, purchase_date, expiry_date)
          VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + make_interval(days => $3))`,
          [user_id, card_id, duration]);

        await client.query("COMMIT");
        console.log("Transaction completed successfully.");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Transaction failed:", error);
    } finally {
        client.release();
    }
};
