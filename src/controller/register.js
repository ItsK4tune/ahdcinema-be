import checkUsername from "../model/checkUsername.js";
import createUser from "../model/createUser.js";

let Register = async (req, res) => {

    const {Username, Password} = req.body;

    try {
        // Retrieve user by username from the database
        const user = await checkUsername(Username);
        
        if (!user) {
            try {
                await createUser(Username, Password);
            }
            catch (err){
                console.error('Error creating user:', err);
            }
            // Respond with success message
            console.log("<<<<<Register successful <3 <3")
            return res.status(201).json({ message: 'User registered successfully'});
        }

        // Respond with failed message
        console.log('<<<<<Register failed!!');
        return res.status(300).json({ message: 'Username is already taken' });
    }
    catch (error) {
        console.error('Error querying:', error);
        res.status(500)
    }
}

export default Register;