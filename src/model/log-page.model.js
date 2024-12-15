import db from '../config/connectDB.js';

export const getWallet = async (user_id) => {
    try {
        const result = await db.query(`select wallet_balance from UserInfo where user_id = $1`, [user_id]);
        return result.rows.length ? result.rows[0].wallet_balance : null
    } 
    catch (error) {
        console.error('Error getting wallet: ', error);
    }
}

export const postWallet = async (topup_value, user_id) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        await client.query(`insert into TopupWallets(topup_value, user_id) values ($1, $2)`, [topup_value, user_id]);
        await client.query(`update UserInfo set wallet_balance=wallet_balance+$1 where user_id=$2`,[topup_value, user_id]);
        await client.query("COMMIT");
        console.log("Transaction completed successfully.");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Transaction failed:", error);
    } finally {
        client.release();
    }
}

export const getHistory = async (user_id) => {
    try {
        const result = await db.query(`SELECT 
                                                Tickets.total_price AS amount, 
                                                Tickets.booking_date AS transaction_date, 
                                                'Ticket Purchase' AS transaction_type,
                                                jsonb_build_object(
                                                    'seat_number', Seats.seat_number,
                                                    'seat_type', SeatType.seat_type,
                                                    'room_number', ScreeningRooms.room_number,
                                                    'room_type', ScreeningRooms.room_type,
                                                    'cinema_name', Cinemas.cinema_name,
                                                    'show_date', Showtimes.show_date,
                                                    'show_time', Showtimes.show_time,
                                                    'movie_name', Movies.movie_name,
                                                    'movie_image', Movies.movie_image,
                                                    'duration', Movies.duration,
                                                    'category', Movies.category,
                                                    'voucher_value', Vouchers.voucher_value
                                                ) AS detail
                                                FROM Tickets 
                                                JOIN Seats ON Tickets.seat_id = Seats.seat_id
                                                JOIN SeatType ON SeatType.seat_type_id = Seats.seat_type_id
                                                JOIN ScreeningRooms ON ScreeningRooms.screeningroom_id=Seats.screeningroom_id
                                                JOIN Cinemas ON ScreeningRooms.cinema_id=Cinemas.cinema_id
                                                JOIN Showtimes ON Showtimes.showtime_id=Tickets.showtime_id
                                                JOIN Movies ON Movies.movie_id=Showtimes.movie_id
                                                JOIN Vouchers ON Vouchers.voucher_id=Tickets.voucher_id
                                                WHERE Tickets.user_id = $1 AND Tickets.is_paid = TRUE

                                                UNION ALL

                                                SELECT 
                                                MemberCards.price AS amount, 
                                                CardPurchases.purchase_date AS transaction_date, 
                                                'Card Purchase' AS transaction_type,
                                                jsonb_build_object(
                                                    'card_type', MemberCards.card_type,
                                                    'duration', MemberCards.duration,
                                                    'benefits', MemberCards.benefits
                                                ) AS detail
                                                    FROM CardPurchases 
                                                    JOIN MemberCards ON CardPurchases.card_id = MemberCards.card_id
                                                    WHERE CardPurchases.user_id=$1 AND CardPurchases.is_paid = TRUE

                                                UNION ALL

                                                SELECT 
                                                topup_value AS amount, 
                                                topup_date AS transaction_date, 
                                                'Topup Wallet' AS transaction_type,
                                                '{}'::jsonb AS detail
                                                FROM TopupWallets 
                                                WHERE user_id = $1

                                                ORDER BY transaction_date DESC`, [user_id]);
        return result.rows.length ? result.rows : null
    } 
    catch (error) {
        console.error('Error getting payment history: ', error);
        return { error: 'Error retrieving payment history' };
    }
}