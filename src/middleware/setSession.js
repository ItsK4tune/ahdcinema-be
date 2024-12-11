export const setAdminSession = (req, res, next) => {
    const { Username } = req.body;

    if (!Username) {
        return res.status(400).json({ error: "Username is required" });
    }

    req.session.user = { username: Username, isAdmin: true }; 
    next();
};

export const setUserSession = (req, res, next) => {
    const { Username } = req.body;

    if (!Username) {
        return res.status(400).json({ error: "Username is required" });
    }

    req.session.user = { username: Username, isAdmin: false }; 
    next();
};
