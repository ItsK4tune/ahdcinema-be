import pool from '../config/connectDB.js';

export const getUserExist = async (username, password) => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM users WHERE user_account = ? and user_password = ?', [username, password]);

        //check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user:', error);
    }
}

export const getUsername = async (username) => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM users WHERE user_account = ?', [username]);

        //check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
    }
}

export const createUser = async (username, password) => {
    try {
        await pool.execute('INSERT INTO users (user_account, user_password) VALUES (?, ?)', [username, password]);
    } 
    catch (error) {
        console.error('Error creating user:', error);
    }
}

export const deleteUser = async (username, password) => {
    try {
        await pool.execute('DELETE FROM users WHERE user_account = ? AND user_password = ?', [username, password]);
    } 
    catch (error) {
        console.error('Error delete user:', error);
    }
}

export const getUserID = async (username, password) => {
    try {
        const [rows, field] = await pool.execute('SELECT user_id FROM users WHERE user_account = ?', [username]);

        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
    }
}