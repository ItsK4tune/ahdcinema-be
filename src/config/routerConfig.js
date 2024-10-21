import express from 'express';

let configRouter = (router) =>{
    // Set parser for header: application/json and application/x-www-form-urlencoded
    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));
}

export default configRouter;