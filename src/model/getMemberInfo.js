import pool from '../config/connectDB.js';

let getMemberInfo = async (user_id) => {
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

export default getMemberInfo;