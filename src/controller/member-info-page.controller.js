import { getMemberInfo, postUserInfo } from '../model/member-info-page.model.js';

export const GetMemberInfo = async (req, res) => {
    const {user_id} = req.query;
    console.log(user_id)
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

export const PostMemberInfo = async (req, res) => {
    const {user_id} = req.query;
    const updateData = req.body;
    console.log(updateData)
    if (!user_id) {
        console.log('Missing user_id.');
        return res.status(400).json({ message: 'user_id is required' });
    }
    if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        console.log('No fields provided to update.');
        return res.status(400).json({ message: 'No infomation provided to update' });
    }

    try {
        const isUpdated = await postUserInfo(user_id, updateData);
        if (isUpdated) {
            return res.status(200).json({ message: 'Profile updated' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.log('Error updating member information: ', error);
        res.status(500).json({ message: 'Error updating member informaton' });
    }
}