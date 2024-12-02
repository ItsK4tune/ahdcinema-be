import express from 'express'
import configRouter from '../config/routerConfig.js';
import { 
    GetCinema, 
    GetCity, 
    GetCurrentMovie, 
    GetMovieContent, 
    GetShowTime, 
    GetUpcomingMovie } from '../controller/noAuthenMethod.controller.js';
import checkSession from '../middleware/checkSession.js'
import { 
    ChooseSeat,
    GetCardType,
    GetMemberInfo, 
    GetMovieCity, 
    GetShowDate, 
    GetUserMemberCard, 
    GetVoucher, 
    PostMemeberInfor } from '../controller/authentication.controller.js';

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
cinemaRouter.get('/buyticket/movie-showdates', checkSession, GetShowDate);
cinemaRouter.get('/buyticket/movie-cities', checkSession, GetMovieCity);
cinemaRouter.get('/buyticket/movie-showtimes', checkSession, GetShowTime);

cinemaRouter.get('/buyticket/choose-seats', checkSession, ChooseSeat);

cinemaRouter.get('/buyticket/vouchers', checkSession, GetVoucher)

export default cinemaRouter;

