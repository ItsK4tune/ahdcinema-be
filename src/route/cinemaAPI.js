import express from 'express'

import configRouter from '../config/routerConfig.js';

import GetCity from '../controller/getCity.js';
import GetCinema from '../controller/getCinema.js';
import GetShowTime from '../controller/getShowtime.js';
import GetMovieContent from '../controller/getMovieContent.js';
import GetCurrentMovie from '../controller/getCurrentMovie.js'
import GetUpcomingMovie from '../controller/getUpcomingMovie.js';

let cinemaRouter = express.Router();

configRouter(cinemaRouter);

//no need authentication

//get cities "/cities"
cinemaRouter.get('/cities', GetCity)

//get cinemas based on city_id "/cinemas?city_id={}"
cinemaRouter.get('/cinemas', GetCinema)

//get showtime based on cinema_id, show_date "/showtimes?cinema_id={}&show_date={}"
cinemaRouter.get('/showtimes', GetShowTime)

cinemaRouter.get('/now-showing', GetCurrentMovie)

cinemaRouter.get('/coming-soon', GetUpcomingMovie)

cinemaRouter.get('/movie-content', GetMovieContent)

cinemaRouter.get('/event');

//need authentication

cinemaRouter.route('/member-info')
    .get()
    .post()

cinemaRouter.get('/card-types');

cinemaRouter.get('/card-purchase');

cinemaRouter.get('/movie-showdates');

cinemaRouter.get('/movie-cities');

cinemaRouter.get('/movie-showtimes');

export default cinemaRouter;

