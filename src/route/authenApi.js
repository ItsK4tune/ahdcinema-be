import express from 'express'

import configRouter from '../config/routerConfig.js';

import Login from '../controller/login.js'
import Register from '../controller/register.js';
import deleteUser from '../model/deleteUser.js';

let authRouter = express.Router();

configRouter(authRouter);

// register API
authRouter.post('/register', Register)

// login API
authRouter.post('/login', Login)

// delete API
authRouter.post('/delete', deleteUser)

export default authRouter;