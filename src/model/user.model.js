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

export const getMemberInfo = async (user_id) => {
    try {
        const [rows, field] = await pool.execute(`select email, UserInfo.* from UserInfo join Users on
                                                 UserInfo.user_id=Users.user_id where Users.user_id=?`,[user_id]);

        //check whether rows is null or not
        return rows.length ? rows : null;
    } 
    catch (error) {
        console.error('Error getting member information:', error);
    }
}

export const postUserInfo = async (user_id, updateData) => {
    try {
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updateData)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        values.push(user_id);

        const query = `UPDATE UserInfo SET ${fields.join(', ')} WHERE user_id = ?`;

        const [result] = await pool.execute(query, values);

        if (result.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error updating user information:', error);
        return false;
    }
};


