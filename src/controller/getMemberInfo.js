import getMemberInfo from "../model/getMemberInfo.js";

let GetMemberInfo = async (req, res) => {
    const {user_id}=req.query;
    try {
        const result = await getMemberInfo(user_id);
        
        return res.status(201).json(result);
    }
    catch (error) {
        //respond with error message
        console.error('Error getting member information:', error);
        res.status(404).json({message: 'Error getting member informaton'});
    }
}

export default GetMemberInfo;