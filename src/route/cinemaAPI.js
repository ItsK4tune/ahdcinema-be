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

let cinemaRouter = express.Router();

configRouter(cinemaRouter);

//no need authentication

cinemaRouter.get('/');

//get cities "/cities"
cinemaRouter.get('/cities', GetCity);

//get cinemas based on city_id "/cinemas?city_id={}"
cinemaRouter.get('/cinemas', GetCinema);

//get showtime based on cinema_id, show_date "/showtimes?cinema_id={}&show_date={}"
cinemaRouter.get('/showtimes', GetShowTime);

cinemaRouter.get('/now-showing', GetCurrentMovie);

cinemaRouter.get('/coming-soon', GetUpcomingMovie);

cinemaRouter.get('/movie-content', GetMovieContent);

cinemaRouter.get('/event');

//need authentication

cinemaRouter.route('/member-info')
    .get(checkSession, )
    .post(checkSession, )

cinemaRouter.get('/card-types', checkSession);

cinemaRouter.get('/card-purchase', checkSession);

cinemaRouter.get('/movie-showdates', checkSession);

cinemaRouter.get('/movie-cities', checkSession);

cinemaRouter.get('/movie-showtimes', checkSession);

export default cinemaRouter;

