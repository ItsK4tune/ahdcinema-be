import pool from '../config/connectDB.js';

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
