import checkUserExist from '../model/checkUserExist.js'
import deleteUser from '../model/deleteUser.js';

let DeleteUser = async (req, res) => {
    const {Username, Password} = req.body;

    try {
        // Retrieve user by username from the database
        const user = await checkUserExist(Username, Password);
        
        if (!user) {
            console.log('Delete failed');
            return res.status(300).json({ message: 'No user matched'} )
        }

        // Respond with success message
        await deleteUser(Username, Password);
        res.status(201).json({ message: 'Successed'})
        console.log('Deleted successfully');
    }
    catch (error) {
        console.error('Error deleting:', error);
        res.status(500);
    }
}

export default DeleteUser;