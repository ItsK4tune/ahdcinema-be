import express from 'express';

import authenAPI from './route/authenApi.js';

const app = express();
const PORT = process.env.PORT || 3000;

authenAPI(app);

app.listen(PORT, () => {
    console.log(`Khoi tao server tai http://localhost:${PORT}`);
})  