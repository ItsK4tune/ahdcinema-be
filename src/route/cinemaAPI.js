import express from 'express';
import configRouter from '../config/routerConfig.js';
import { checkSession } from '../middleware/checkSession.js';
import { GetCinema, GetCity, GetShowTime } from '../controller/theater-page.controller.js';
import { GetCurrentMovie, GetUpcomingMovie } from '../controller/movielist-page.controller.js';
import { GetMovieContent } from '../controller/movie-detail.controller.js';
import { GetMemberInfo, PostMemberInfo } from '../controller/member-info-page.controller.js';
import { BuyCard, GetCardType, GetUserMemberCard } from '../controller/membership-page.controller.js';
import { ChooseSeat, GetMovieCity_ticket, GetShowDate_ticket, GetShowTime_ticket, GetVoucher, PayTicket } from '../controller/ticket-purchase-page.controller.js';
import { GetCardInfo, GetTicketInfo, PostCard, PostTicket } from '../controller/ticket-payment.controller.js';
import { GetHistory, GetWallet, PostWallet } from '../controller/log-page.controller.js';
import { GetAll } from '../controller/main-page.controller.js';

let cinemaRouter = express.Router();

configRouter(cinemaRouter);

//no need authentication

//Main webpage
cinemaRouter.get('/', GetAll);

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
cinemaRouter.get('/member-info', checkSession, GetMemberInfo);
cinemaRouter.post('/member-info',checkSession, PostMemberInfo);

//Membership webpage
cinemaRouter.get('/card-types', checkSession, GetCardType);
cinemaRouter.get('/user-membercard', checkSession, GetUserMemberCard);
cinemaRouter.post('/buycard', checkSession, BuyCard);

// //Membership purchase webpage
// cinemaRouter.post('/card-purchase', checkSession, CardPuchase);

//Movie ticket purchase webpage
cinemaRouter.get('/buyticket/movie-showdates', checkSession, GetShowDate_ticket);
cinemaRouter.get('/buyticket/movie-cities', checkSession, GetMovieCity_ticket);
cinemaRouter.get('/buyticket/movie-showtimes', checkSession, GetShowTime_ticket);

cinemaRouter.get('/buyticket/choose-seats', checkSession, ChooseSeat);

cinemaRouter.get('/buyticket/vouchers', checkSession, GetVoucher);
cinemaRouter.get('/buyticket/get-membercard', checkSession, GetUserMemberCard);
cinemaRouter.post('/buyticket/payment', checkSession, PayTicket);

//Ticket payment webpage
cinemaRouter.get('/payment/ticket', checkSession, GetTicketInfo);
cinemaRouter.get('/payment/card', checkSession, GetCardInfo);
cinemaRouter.post('/payment/ticket', checkSession, PostTicket);
cinemaRouter.post('/payment/card', checkSession, PostCard);

//Log webpage
cinemaRouter.get('/mywallet', checkSession, GetWallet);
cinemaRouter.post('/top-up-wallet', checkSession, PostWallet);
cinemaRouter.get('/payment-history', checkSession, GetHistory);


export default cinemaRouter;

