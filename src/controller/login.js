import checkUserExist from '../model/checkUserExist.js'

let Login = async (req, res) => {

    const {Username, Password} = req.body;

    try {
        // Retrieve user by username from the database
        const user = await checkUserExist(Username, Password);
        
        if (!user) {
            console.log('>>>>>Login failed!!!');
            return res.status(300).json({ message: 'Failed'} )
        }

        // Respond with success message
        res.status(201).json({ message: 'Successed'})
        console.log('>>>>>Login successful <3 <3');
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500)
    }
}

export default Login;