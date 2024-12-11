import db from '../config/connectDB.js';

export const getMemberInfo = async (user_id) => {
    try {
        const result = await db.query(`select email, UserInfo.* from UserInfo join Users on
                                                 UserInfo.user_id=Users.user_id where Users.user_id=$1`,[user_id]);

        return result.rows.length ? result.rows[0] : null
    } 
    catch (error) {
        console.error('Error getting member information:', error);
    }
}

export const postUserInfo = async (user_id, updateData) => {
    if (Object.keys(updateData).length === 0) {
        console.log('No data to update.');
        return false; // Trả về false nếu không có dữ liệu cần cập nhật
    }
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
        const query = `UPDATE UserInfo SET ${fields.join(', ')} WHERE user_id = $${index} returning *`;
        console.log(query)
        console.log(values)
        const result = await db.query(query, values);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error updating user information:', error);
        return false;
    }
};
