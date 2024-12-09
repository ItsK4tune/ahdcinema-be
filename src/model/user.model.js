import db from '../config/connectDB.js';

export const getUserExist = async (username, password) => {
    try {
        const [rows, field] = await db.query('SELECT * FROM user WHERE Username = $1 and Password = $2', [username, password]);

        //check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user:', error);
    }
}

export const getUsername = async (username) => {
    try {
        const [rows, field] = await db.query('SELECT * FROM user WHERE Username = $1', [username]);

        //check whether rows is null or not
        return rows.length ? rows[0] : null;
    } 
    catch (error) {
        console.error('Error getting user by username:', error);
    }
}

export const createUser = async (username, password) => {
    try {
        await db.query('INSERT INTO user (Username, Password) VALUES ($1, $2)', [username, password]);
    } 
    catch (error) {
        console.error('Error creating user:', error);
    }
}

export const deleteUser = async (username, password) => {
    try {
        await db.query('DELETE FROM user WHERE Username = $1 AND Password = $2', [username, password]);
    } 
    catch (error) {
        console.error('Error delete user:', error);
    }
}

export const getMemberInfo = async (user_id) => {
    try {
        const [rows, field] = await db.query(`select email, UserInfo.* from UserInfo join Users on
                                                 UserInfo.user_id=Users.user_id where Users.user_id=$1`,[user_id]);

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
            fields.push(`${key} = $1`);
            values.push(value);
        }

        values.push(user_id);

        const query = `UPDATE UserInfo SET ${fields.join(', ')} WHERE user_id = $1`;

        const [result] = await db.query(query, values);

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


