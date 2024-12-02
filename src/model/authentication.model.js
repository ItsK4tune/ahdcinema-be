import pool from '../config/connectDB.js';

export const getUserExist = async (username, password) => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM user WHERE Username = ? and Password = ?', [username, password]);

        //check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user:', error);
    }
}

export const getUsername = async (username) => {
    try {
        const [rows, field] = await pool.execute('SELECT * FROM user WHERE Username = ?', [username]);

        //check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
    }
}

export const createUser = async (username, password) => {
    try {
        await pool.execute('INSERT INTO user (Username, Password) VALUES (?, ?)', [username, password]);
    } 
    catch (error) {
        console.error('Error creating user:', error);
    }
}

export const deleteUser = async (username, password) => {
    try {
        await pool.execute('DELETE FROM user WHERE Username = ? AND Password = ?', [username, password]);
    } 
    catch (error) {
        console.error('Error delete user:', error);
    }
}