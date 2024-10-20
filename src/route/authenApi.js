import express from 'express'

import configRouter from '../config/routerConfig.js';

import Login from '../controller/login.js'

let router = express.Router();

configRouter(router);

const authenAPI = (app) => {
    // register API
    router.get('/api/register', (req, res) => {
        res.status(201).json({ message: 'User registered successfully'});
    })
    
    // login API
    router.post('/api/login', Login)


    return app.use('/', router)
}

export default authenAPI;