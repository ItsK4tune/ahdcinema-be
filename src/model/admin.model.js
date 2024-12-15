import db from '../config/connectDB.js';

export const getAdminExist = async (username) => {
    try {
        const result = await db.query('SELECT * FROM Admins WHERE admin_account = $1', [username]);
        return result.rows.length ? result.rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const createAdmin = async (username, password, email, fullname, phonenumber) => {
    const client = await db.connect();
    
    try {
        await client.query('BEGIN');

        await client.query(
            'INSERT INTO Admins (user_account, user_password) VALUES ($1, $2)',
            [username, password]
        );

        await client.query(
            'INSERT INTO AdminInfo(fullname, phonenumber, email) VALUES ($1, $2, $3)',
            [fullname, phonenumber, email]
        );

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating user:', error);
    } finally {
        client.release();
    }
};

export const deleteAdmin = async (username, password) => {
    try {
        await db.query('DELETE FROM Admins WHERE admin_account = $1 AND admin_password = $2', [username, password]);
    } 
    catch (error) {
        console.error('Error delete admin:', error);
    }
};

export const getOldPassword = async (admin_id) => {
    try {
        const result = await db.query("SELECT admin_password FROM Admins WHERE admin_id = $1", [admin_id]);
        return result.rows.length ? result.rows[0].user_password : null;
    } 
    catch (error) {
        console.error('Error getting password by adminId:', error);
        throw error;
    }
};

export const updateNewPassword = async (password, admin_account) => {
    try {
        await db.query("UPDATE Admins SET admin_password = $1 WHERE admin_account = $2", [password, admin_account]);
    } catch (error) {
        console.error(`Error creating new password for ${admin_account}:`, error);
        throw error; 
    }
};

export const getAdminID = async (username) => {
    try {
        const result = await db.query('SELECT admin_id FROM Admins WHERE admin_account = $1', [username]);
        return result.rows.length ? result.rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting admin by username:', error);
    }
};

export const checkEmail = async (email) => {
    try {
        const result = await db.query('SELECT * FROM AdminInfo WHERE email=$1', [email]);
        return result.rows[0] || null; 
    } 
    catch (error) {
        console.error('Error getting user by email', error);
        throw error;
    }
};

export const setNewPassword = async (password, email) => {
    try {
        await db.query('UPDATE Users SET user_password=$1 WHERE email=$2', [password, email]);

        if (result.rowCount === 0) {
            console.warn(`No rows updated for email: ${email}`);
        }
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
        throw error;
    }
};