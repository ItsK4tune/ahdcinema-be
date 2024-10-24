import checkUserExist from '../model/checkUserExist.js'

let Login = async (req, res, next) => {

    const {Username, Password} = req.body;

    try {
        //retrieve user by username from the database
        const user = await checkUserExist(Username, Password);
        
        if (!user) {
            //respond with fail message
            console.log('Login failed');
            return res.status(400).json({message: 'Failed'});
        }

        //respond with success message
        res.status(201).json({message: 'Successed'})
        console.log('Login successful');
        next();
    }
    catch (error) {
        //respond with error message
        console.error('Error logging in:', error);
        res.status(404).json({message: 'Error logging in'});
    }
}

export default Login;