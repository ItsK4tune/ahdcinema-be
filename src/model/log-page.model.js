import pool from '../config/connectDB.js';

export const getWallet = async (user_id) => {
    try {
        const [rows, field] = await pool.execute(`select wallet_balance from UserInfo where user_id = ?`, [user_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting wallet: ', error);
    }
}

export const postWallet = async (topup_value, user_id) => {
    try {
        await pool.execute(`insert into TopupWallets(topup_value, user_id) values (?, ?)`, [topup_value, user_id]);
    } 
    catch (error) {
        console.error('Error getting wallet: ', error);
    }
}

export const getHistory = async (user_id) => {
    try {
        const [rows, field] = await pool.execute(`SELECT 
                                                Tickets.total_price AS amount, 
                                                Tickets.booking_date AS transaction_date, 
                                                'Ticket Purchase' AS transaction_type,
                                                jsonb_build_object(
                                                    'Seats', Seats.*,
                                                    'SeatType', SeatType.*,
                                                    'ScreeningRoom', ScreeningRoom.*,
                                                    'Cinema', Cinemas.*,
                                                    'Showtime', Showtimes.*,
                                                    'Movie', Movies.*,
                                                    'Voucher', Vouchers.*
                                                ) AS detail
                                                FROM Tickets 
                                                JOIN Seats ON Tickets.seat_id = Seats.seat_id
                                                JOIN SeatType ON SeatType.seat_type_id = Seats.seat_type_id
                                                JOIN ScreeningRoom ON ScreeningRoom.screeningroom_id=Seats.screeningroom_id
                                                JOIN Cinemas ON ScreeningRoom.cinema_id=Cinemas.cinema_id
                                                JOIN Showtimes ON Showtimes.showtime_id=Tickets.showtime_id
                                                JOIN Movies ON Movies.movie_id=Showtimes.movie_id
                                                JOIN Vouchers ON Vouchers.voucher_id=Tickets.voucher_id
                                                WHERE Tickets.user_id = ? AND Tickets.is_paid = TRUE

                                                UNION ALL

                                                SELECT 
                                                MemberCards.price AS amount, 
                                                CardPurchases.purchase_date AS transaction_date, 
                                                'Card Purchase' AS transaction_type,
                                                jsonb_build_object(
                                                    'MemberCard', MemberCards.*
                                                ) AS detail
                                                    FROM CardPurchases 
                                                    JOIN MemberCards ON CardPurchases.card_id = MemberCards.card_id
                                                    WHERE CardPurchases.user_id=<user_id> AND CardPurchases.is_paid = TRUE

                                                UNION ALL

                                                SELECT 
                                                topup_value AS amount, 
                                                topup_date AS transaction_date, 
                                                'Topup Wallet' AS transaction_type,
                                                NULL AS detail
                                                FROM TopupWallets 
                                                WHERE user_id = ?

                                                ORDER BY transaction_date DESC`, [user_id]);
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting payment history: ', error);
    }
}