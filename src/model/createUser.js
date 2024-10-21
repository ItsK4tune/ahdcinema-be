import pool from '../config/connectDB.js';

let createUser = async (username, password) => {
    try {
        await pool.execute('INSERT INTO user (Username, Password) VALUES (?, ?)', [username, password]);
    } 
    catch (error) {
        console.error('Error creating user:', error);
    }
}

export default createUser;