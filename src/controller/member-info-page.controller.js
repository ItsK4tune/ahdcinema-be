import { getMemberInfo, postUserInfo } from '../model/member-info-page.model.js';

export const GetMemberInfo = async (req, res) => {
    const {user_id} = req.query;

    if (!user_id) {
        console.log('GetMemberInfo failed: Missing user_id parameter');
        return res.status(400).json({ message: 'user_id parameter is required' });
    }

    try {
        const result = await getMemberInfo(user_id);    
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting member information: ', error);
        res.status(500).json({ message: 'Error getting member informaton' });
    }
}

export const PostMemeberInfor = async (req, res) => {
    const {user_id} = req.query;
    const updateData = req.body;

    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        console.log('No fields provided to update.');
        return res.status(400).json({ message: 'No infomation provided to update' });
    }

    try {
        await postUserInfo(user_id, updateData);
        return res.status(200).json({ message: 'Profile updated' });
    }
    catch (error) {
        console.log('Error updating member information: ', error);
        res.status(500).json({ message: 'Error updating member informaton' });
    }
}