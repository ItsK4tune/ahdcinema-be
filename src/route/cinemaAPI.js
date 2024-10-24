import express from 'express'

import configRouter from '../config/routerConfig.js';

let cinemaRouter = express.Router();

configRouter(cinemaRouter);

cinemaRouter.get('/cities')

cinemaRouter.get('/cinemas')

cinemaRouter.get('/showtimes')

cinemaRouter.get('/now-showing')

cinemaRouter.get('/coming-soon')

cinemaRouter.get('/movie-content')

cinemaRouter.get('/event');

export default cinemaRouter;