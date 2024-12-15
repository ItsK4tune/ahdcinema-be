import db from '../config/connectDB.js';

export const getUserExist = async (username) => {
    try {
        const [rows, field] = await db.query('SELECT * FROM Users WHERE user_account = $1', [username]);

        //check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const checkEmail = async (email, logBy) => {
    try {
        const result = await db.query('SELECT * FROM Users WHERE email=$1 AND log_by=$2',[email, logBy]);
        return result.rows.length ? result.rows[0] : null
    } 
    catch (error) {
        console.error('Error getting user by email', error);
        throw error;
    }
};

export const setNewPassword = async (password, email) => {
    try {
        await db.query('UPDATE Users SET user_password=$1 WHERE email=$2 and log_by=$3',[password, email, 'local']);
        // Kiểm tra xem có thay đổi dòng nào không
        if (result.rowCount === 0) {
            console.warn(`No rows updated for email: ${email}`);
        }
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
        throw error;
    }
};

export const createUser = async (username, password, email, fullname, phonenumber) => {
    const client = await db.connect();
    try {

        await client.query('BEGIN');

        const result=await client.query(
            'INSERT INTO Users (user_account, user_password, email, log_by) VALUES ($1, $2, $3, $4) returning user_id',
            [username, password, email, 'local']
        );
        await client.query(
            'INSERT INTO UserInfo(user_id, fullname, phonenumber) VALUES ($1, $2, $3)',
            [result.rows[0].user_id, fullname, phonenumber]
        );

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating user:', error);
    } finally {
        client.release();
    }
};

export const deleteUser = async (username, password) => {
    try {
        await db.query('DELETE FROM Users WHERE user_account = $1 AND user_password = $2', [username, password]);
    } 
    catch (error) {
        console.error('Error delete user:', error);
    }
};

export const getUserID = async (username) => {
    try {
        const result= await db.query('SELECT user_id FROM Users WHERE user_account = $1', [username]);

        return result.rows.length ? result.rows[0] : null
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
    }
}
export const getCurrentLogBy = async (userId) => {
    try {
        const result = await db.query("SELECT log_by FROM Users WHERE user_id = $1", [userId]);
        return result.rows[0].log_by || null;
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
        throw error;
    }
}
export const getOldPassword = async (userId) => {
    try {
        const result = await db.query("SELECT user_password FROM Users WHERE user_id = $1", [userId]);
        return result.rows[0].user_password || null;
    } 
    catch (error) {
        console.error('Error getting password by userId:', error);
        throw error;
    }
};

export const updateNewPassword = async (password, user_id) => {
    try {
        await db.query("UPDATE Users SET user_password = $1 WHERE user_id = $2", [password, user_id]);
    } catch (error) {
        console.error(`Error updating new password for ${user_id}:`, error);
        throw error; 
    }
};

export const createOAuthAccount = async (name, email, logBy) => {
    try {
        const result = await db.query(
            'INSERT INTO Users (user_account, email, log_by) VALUES ($1, $2, $3) RETURNING *',[name, email, logBy]
        );
        return result.rows[0]; 
    } catch (error) {
        console.error('Error creating new OAuth account:', error);
        throw error; 
    }
};
