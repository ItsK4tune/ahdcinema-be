import { chooseSeat, getMovieCity, getShowDate, getShowTime, getVoucher, payTicket } from '../model/ticket-purchase-page-model.js';

export const GetShowDate_ticket = async (req, res) => {
    const { movie_id } = req.query;

    if (!movie_id) {
        console.log('GetShowDate_ticket failed: Missing movie_id parameter');
        return res.status(400).json({ message: 'movie_id parameter is required' });
    }

    try {
        const result = await getShowDate(movie_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting showdate: `, error);
        res.status(500).json({ message: `Error getting showdate` });
    }
}

export const GetMovieCity_ticket = async (req, res) => {
    const { movie_id, show_date } = req.query;

    if (!movie_id || !show_date) {
        console.log('GetMovieCity_ticket failed: Missing user_id or show_date parameter');
        return res.status(400).json({ message: 'user_id and show_date parameter is required' });
    }

    try {
        const result = await getMovieCity(movie_id, show_date);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting city: `, error);
        res.status(500).json({ message: `Error getting city` });
    }
}

export const GetShowTime_ticket = async (req, res) => {
    const { movie_id, show_date, city_id } = req.query;

    if (!movie_id || !show_date || !city_id) {
        console.log('GetShowTime_ticket failed: Missing user_id or show_date or city_id parameter');
        return res.status(400).json({ message: 'user_id, show_date and city_id parameter is required' });
    }

    try {
        const result = await getShowTime(movie_id, show_date, city_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting showtime: `, error);
        res.status(500).json({ message: `Error getting showtime` });
    }
}

export const ChooseSeat = async (req, res) => {
    const { screeningroom_id } = req.query;

    if (!screeningroom_id) {
        console.log('ChooseSeat failed: Missing screeningroom_id parameter');
        return res.status(400).json({ message: 'screeningroom_id parameter is required' });
    }

    try {
        const result = await chooseSeat(screeningroom_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error choosing seat: `, error);
        res.status(500).json({ message: `Error choosing seat` });
    }
}

export const GetVoucher = async (req, res) => {
    const { voucher_code } = req.query;

    if (!voucher_code) {
        console.log('GetVoucher failed: Missing voucher_code parameter');
        return res.status(400).json({ message: 'voucher_code parameter is required' });
    }
    try {
        const result = await getVoucher(voucher_code);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error getting voucher: `, error);
        res.status(500).json({ message: `Error getting voucher` });
    }
}

export const PayTicket = async (req, res) => {
    const { total_price, user_id, seat_id, showtime_id, voucher_id } = req.query;
    if (total_price == null || !user_id || !seat_id || !showtime_id || !voucher_id) {
        console.log('PayTicket failed: Missing parameter');
        return res.status(400).json({ message: 'total_price, user_id, seat_id, showtime_id and voucher_id parameter are required' });
    }
    try {
        const result = await payTicket(total_price, user_id, seat_id, showtime_id, voucher_id);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`Error returning ticket_id: `, error);
        res.status(500).json({ message: `Error returning ticket_id` });
    }
}