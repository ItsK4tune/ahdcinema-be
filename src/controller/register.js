import checkUsername from "../model/checkUsername.js";
import createUser from "../model/createUser.js";

let Register = async (req, res) => {

    const {Username, Password} = req.body;

    try {
        //retrieve user by username from the database
        const user = await checkUsername(Username);
        
        if (!user) {
            try {
                //create new record in db
                await createUser(Username, Password);
            }
            catch (err){
                //respond with error message
                console.error('Error creating user:', err);
                return res.status(404).json({message: 'Error creating user:'});
            }
            //respond with success message
            console.log("Register successful")
            return res.status(201).json({ message: 'Successed'});
        }

        //respond with failed message
        console.log('Register failed');
        return res.status(300).json({ message: 'Username is already taken' });
    }
    catch (error) {
        console.error('Error querying:', error);
        res.status(404).json({message: 'Error querying'});
    }
}

export default Register;