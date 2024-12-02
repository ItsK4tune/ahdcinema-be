import { getMemberInfo } from "../model/user.model";

export const GetMemberInfo = async (req, res) => {
    const {user_id}=req.query;

    if (!user_id) {
        console.log('GetMemberInfo failed: Missing user_id parameter');
        return res.status(400).json({ message: 'user_id parameter is required' });
    }

    try {
        const result = await getMemberInfo(user_id);    
        return res.status(200).json(result);
    }
    catch (error) {
        console.error('Error getting member information:', error);
        res.status(500).json({message: 'Error getting member informaton'});
    }
}