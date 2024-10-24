import checkUserExist from '../model/checkUserExist.js'
import deleteUser from '../model/deleteUser.js';

let DeleteUser = async (req, res) => {
    const {Username, Password} = req.body;

    try {
        //retrieve user by username from the database
        const user = await checkUserExist(Username, Password);
        
        if (!user) {
            //respond with fail message
            console.log('Delete failed');
            return res.status(400).json({message: 'No user matched'})
        }

        // Respond with success message
        await deleteUser(Username, Password);
        res.status(201).json({message:'Successed'})
        console.log('Deleted successfully');
    }
    catch (error) {
        //respond with error message
        console.error('Error deleting: ', error);
        res.status(404).json({message: 'Error deleting'});
    }
}

export default DeleteUser;