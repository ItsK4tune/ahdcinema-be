import express from 'express';
import configRouter from '../config/routerConfig.js';
import checkSession from '../middleware/checkSession.js';
import { GetCinema, GetCity, GetShowTime } from '../controller/theater-page.controller.js';
import { GetCurrentMovie, GetUpcomingMovie } from '../controller/movielist-page.controller.js';
import { GetMovieContent } from '../controller/movie-detail.controller.js';
import { GetMemberInfo, PostMemeberInfor } from '../controller/member-info-page.controller.js';
import { GetCardType, GetUserMemberCard } from '../controller/membership-page.controller.js';
import { ChooseSeat, GetMovieCity_ticket, GetShowDate_ticket, GetShowTime_ticket, GetVoucher } from '../controller/ticket-purchase-page.controller.js';

let cinemaRouter = express.Router();

configRouter(cinemaRouter);

//no need authentication

//Main webpage
cinemaRouter.get('/', );

//Theater webpage
cinemaRouter.get('/cities', GetCity);
cinemaRouter.get('/cinemas', GetCinema);
cinemaRouter.get('/showtimes', GetShowTime);

//Movielist webpage
cinemaRouter.get('/now-showing', GetCurrentMovie);
cinemaRouter.get('/coming-soon', GetUpcomingMovie);

//Movie detail webpage
cinemaRouter.get('/movie-content', GetMovieContent);

//Event webpage
cinemaRouter.get('/event');

//need authentication

//Member info webpage
cinemaRouter.get('/member-info', checkSession, GetMemberInfo);
cinemaRouter.post('/member-info',checkSession, PostMemeberInfor);

//Membership webpage
cinemaRouter.get('/card-types', checkSession, GetCardType);
cinemaRouter.get('/user-membercard', checkSession, GetUserMemberCard)

//Membership purchase webpage
cinemaRouter.post('/card-purchase', checkSession);

//Movie ticket purchase webpage
cinemaRouter.get('/buyticket/movie-showdates', checkSession, GetShowDate_ticket);
cinemaRouter.get('/buyticket/movie-cities', checkSession, GetMovieCity_ticket);
cinemaRouter.get('/buyticket/movie-showtimes', checkSession, GetShowTime_ticket);

cinemaRouter.get('/buyticket/choose-seats', checkSession, ChooseSeat);

cinemaRouter.get('/buyticket/vouchers', checkSession, GetVoucher)

export default cinemaRouter;

