import express from 'express';
import configRouter from '../config/routerConfig.js';
import { checkSession, checkUserSession } from '../middleware/checkSession.js';
import { GetCinema, GetCity, GetShowTime } from '../controller/theater-page.controller.js';
import { GetCurrentMovie, GetUpcomingMovie } from '../controller/movielist-page.controller.js';
import { GetMovieContent } from '../controller/movie-detail.controller.js';
import { GetMemberInfo, PostMemberInfo } from '../controller/member-info-page.controller.js';
import { BuyCard, GetCardType, GetUserMemberCard } from '../controller/membership-page.controller.js';
import { ChooseSeat, GetMovieCity_ticket, GetShowDate_ticket, GetShowTime_ticket, GetVoucher, PayTicket } from '../controller/ticket-purchase-page.controller.js';
import { GetCardInfo, GetTicketInfo, PostCard, PostTicket } from '../controller/ticket-payment.controller.js';
import { GetHistory, GetWallet, PostWallet } from '../controller/log-page.controller.js';
import { GetHotMovie } from '../controller/main-page.controller.js';

let cinemaRouter = express.Router();

configRouter(cinemaRouter);

//no need authentication

//Main webpage
cinemaRouter.get('/', GetHotMovie);

//Theater webpage
cinemaRouter.get('/cities', GetCity);
cinemaRouter.get('/cinemas', GetCinema);
cinemaRouter.get('/showtimes', GetShowTime);

//Movielist webpage
cinemaRouter.get('/now-showing', GetCurrentMovie);
cinemaRouter.get('/coming-soon', GetUpcomingMovie);

//Movie detail webpage
cinemaRouter.get('/movie-content', GetMovieContent);

// //Event webpage
// cinemaRouter.get('/event');

//need authentication

//Member info webpage
cinemaRouter.get('/member-info', checkSession, checkUserSession, GetMemberInfo);
cinemaRouter.post('/member-info',checkSession, checkUserSession, PostMemberInfo);

//Membership webpage
cinemaRouter.get('/card-types', checkSession, checkUserSession, GetCardType);
cinemaRouter.get('/user-membercard', checkSession, checkUserSession, GetUserMemberCard);
cinemaRouter.post('/buycard', checkSession, checkUserSession, BuyCard);

// //Membership purchase webpage
// cinemaRouter.post('/card-purchase', checkSession, CardPuchase);

//Movie ticket purchase webpage
cinemaRouter.get('/buyticket/movie-showdates', checkSession, checkUserSession, GetShowDate_ticket);
cinemaRouter.get('/buyticket/movie-cities', checkSession, checkUserSession, GetMovieCity_ticket);
cinemaRouter.get('/buyticket/movie-showtimes', checkSession, checkUserSession, GetShowTime_ticket);

cinemaRouter.get('/buyticket/choose-seats', checkSession, checkUserSession, ChooseSeat);

cinemaRouter.get('/buyticket/vouchers', checkSession, checkUserSession, GetVoucher);
cinemaRouter.get('/buyticket/get-membercard', checkSession, checkUserSession, GetUserMemberCard);
cinemaRouter.post('/buyticket/payment', checkSession, checkUserSession, PayTicket);

//Ticket payment webpage
cinemaRouter.get('/payment/ticket', checkSession, checkUserSession, GetTicketInfo);
cinemaRouter.get('/payment/card', checkSession, checkUserSession, GetCardInfo);
cinemaRouter.post('/payment/ticket', checkSession, checkUserSession, PostTicket);
cinemaRouter.post('/payment/card', checkSession, checkUserSession, PostCard);

//Log webpage
cinemaRouter.get('/mywallet', checkSession, checkUserSession, GetWallet);
cinemaRouter.post('/top-up-wallet', checkSession, checkUserSession, PostWallet);
cinemaRouter.get('/payment-history', checkSession, checkUserSession, GetHistory);


export default cinemaRouter;

