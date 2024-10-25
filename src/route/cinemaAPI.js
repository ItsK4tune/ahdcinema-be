import express from 'express'

import configRouter from '../config/routerConfig.js';

import GetCity from '../controller/getCity.js';
import GetCinema from '../controller/getCinema.js';
import GetShowTime from '../controller/getShowtime.js';

let cinemaRouter = express.Router();

configRouter(cinemaRouter);

//get cities "/cities"
cinemaRouter.get('/cities', GetCity)

//get cinemas based on city_id "/cinemas?city_id={}"
cinemaRouter.get('/cinemas', GetCinema)

//get showtime based on cinema_id, show_date "/showtimes?cinema_id={}&show_date={}"
cinemaRouter.get('/showtimes', GetShowTime)

cinemaRouter.get('/now-showing')

cinemaRouter.get('/coming-soon')

cinemaRouter.get('/movie-content')

cinemaRouter.get('/event');

export default cinemaRouter;