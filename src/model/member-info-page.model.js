import db from '../config/connectDB.js';

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
        let index = 1; 
        for (const [key, value] of Object.entries(updateData)) {
            fields.push(`${key} = $${index}`);
            values.push(value);
            index++;
        }

        values.push(user_id);
        const query = `UPDATE UserInfo SET ${fields.join(', ')} WHERE user_id = $${index}`;

        const [result] = await db.query(query, values);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error updating user information:', error);
        return false;
    }
};
